const fs = require("fs"); // lidar manipulação de arquivo
const path = require("path"); // lidar com diratórios
const uploadConfig = require("../config/upload");

class DiskStorage{ // função
   async saveFile(file){
      await fs.promises.rename(//para poder mudar arquivo de lugar 
         path.resolve(uploadConfig.TMP_FOLDER,file),
         path.resolve(uploadConfig.UPLOADS_FOLDER, file)
      );
      return file;
   }

   // função para deletar
   async deleteFile(file){
      const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file); // buscar arquivo

      // tratamento de exceção
      try{
         await fs.promises.stat(filePath);
      }catch{
         return;
      }

      await fs.promises.unlink(filePath); // para deletar
   }
}

module.exports = DiskStorage;