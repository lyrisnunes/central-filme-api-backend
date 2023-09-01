const {hash, compare}  = require("bcryptjs");

const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");

class UsersControllers{
  async create(request, response){
      const {name, email, password} = request.body;

      const database = await sqliteConnection();
      const checkUsersExists = await database.get("SELECT * FROM users WHERE email =(?)", [email])

      if(checkUsersExists){
         throw new AppError("Este email já esta sendo usado.")
      }

      const hashedPassword = await hash(password, 8)

      await database.run("INSERT INTO users (name, email, password) VALUES (?,?,?)", 
      [name, email, hashedPassword]
      );

       return response.status(201).json();
   }

   async update(request, response){
      const {name, email, password, old_password} = request.body;
      const user_id = request.user.id;

      const database = await sqliteConnection();
      const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

      if(!user){ // verificação se ele não existir
         throw new AppError("Usuário não encontrado.")
      }

      const usersWithUpdateEmail = await database.get("SELECT * FROM users WHERE email =(?)", [email]);

      if(usersWithUpdateEmail && usersWithUpdateEmail.id !== user.id){
         throw new AppError("Este e-mail já está em uso.")
      }

      // novo nome e email
      user.name = name ?? user.name;
      user.email = email ?? user.email;

      // verificar se digitou senha antiga
      if(password && !old_password){
         throw new AppError("Você precisa informar a senha antiga para definir a nova senha")
      }

      if(password && old_password){
         const checkPassword = await compare(old_password, user.password);

         // comparando se a senha antiga está correta
         if(!checkPassword){
            throw new AppError("A senha antiga não confere.")
         }

         user.password = await hash(password, 8)
      }

      // executar a atualização dos dados
      await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
      );

      return response.json();
   }
}

module.exports = UsersControllers;