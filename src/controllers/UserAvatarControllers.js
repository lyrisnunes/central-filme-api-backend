const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class UserAvatarController{
   async update(request, response){
      // pegar o id do usuario que quer atualizar o avatar
      const user_id = request.user.id;
      const avatarFilename = request.file.filename;

      const diskStorage = new DiskStorage(); // distancia a class

      // buscar dados do usuário
      const user = await knex("users") // tabela de users
      .where({id: user_id}).first(); // filtra onde tenha id do usuario

      // verificar usuário não existe.
      if(!user){
         throw new AppError("Somente usuários autenticados podem mudar o avatar", 401);
      }

      // verificar dentro do usuario existe um avatar
      if(user.avatar){
         await diskStorage.deleteFile(user.avatar); // se existir img anterior  deletar
      }

      // caso exista 
      const filename = await diskStorage.saveFile(avatarFilename); // nova foto
      user.avatar = filename; // recebe a nova foto

      await knex("users").update(user).where({ id: user_id });

      return response.json(user);

   }
}

module.exports = UserAvatarController;