const knex = require("../database/knex");

class TagsControllers{
   async index(request, response){ // listar todas tags cadastradas do usuario.
      const user_id = request.user.id;

      const tags = await knex("tags") // tabela de tags
      .where({user_id}) // filtra onde tenha id do usuario

      return response.json(tags)
   }
}

module.exports = TagsControllers;