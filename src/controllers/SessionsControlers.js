const knex = require("../database/knex")
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth"); // importar as configuração
const {sign} = require("jsonwebtoken"); // importar da biblioteca
const { compare } = require("bcryptjs"); //é método

class SessionsControllers{
   async create(request,response){
      const {email, password} = request.body;

      // para acessar a tabela users onde existe email
      const user = await knex("users").where({email}).first();

      // Validação  se o email/senha não existe
      if(!user){
         throw new AppError("E-mail e/ou senha incorreta", 401 );
      }

      // compara a senha digitada e a senha que esta no banco de dados.
      const passwordMathched = await compare(password, user.password);
      
      // verificando não bateu a senha incorrenta
      if(!passwordMathched){
         throw new AppError("E-mail e/ou senha incorreta", 401);
      }

      //pegando a frase secreta e expirção
      const { secret, expiresIn} = authConfig.jwt;
      const token = sign({}, secret, {
         subject: String(user.id),
         expiresIn
      })


      return response.json({user, token})
   }
}

module.exports = SessionsControllers;