const knex = require("../database/knex");

class UserAvatarController{
   async update(request, response){
      // pegar o id do usuario que quer atualizar o avatar
      const user_id = request.user.id;
      const avatarFilename = request.file.filename;


   }
}

module.exports = UserAvatarController;