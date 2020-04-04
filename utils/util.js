class Util {  
    
    static getRandInt (int) {
        return Math.floor(Math.random() * int);
    }
  
  
    static chunk (array, chunkSize){
        const temp = [];
        for(let i = 0; i < array.length; i+= chunkSize){
            temp.push(array.slice(i, i+chunkSize));
        }
        return temp;
    }

    static tn (a,n=1){
      var i = ("     ").repeat(n);
      return a + i.slice(0,i.length-a.length);
    }

    static addZero (a,n=1){
      var i = ("0").repeat(n);
      return i.slice(0,i.length-String(a).length) + String(a);
    }

    static delay (time) {
       return new Promise(function(resolve) { 
           setTimeout(resolve, time)
       });
    }

    static usefulLnk (client){
      const { usefulLink } = require("../bot_setting.json");
      return usefulLink.map(e=>{
        // console.log(e);
        var uri = e.url.includes("{{botId}}") ? e.url.replace(/{{botId}}/g,client.user.id): e.url;
        return `🔹[${e.name}](${uri})`;
      })
    }
}

module.exports = Util;