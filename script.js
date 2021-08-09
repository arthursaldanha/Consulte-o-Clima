(() => {
   document.querySelector(".busca").addEventListener("submit", async (event) => {
      event.preventDefault();
   
      let input = document.querySelector("#searchInput").value;
   
      if (input !== "") {
         showWarning("Carregando...")
   
         let URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=b862c67439050b1e585541bc690168ad&units=metric&lang=pt_br`;
   
         let results = await fetch(URL);
         let json = await results.json();
   
         if (json.cod == 200) {
            showInfo({
               name: json.name,
               country: json.sys.country,
               temp: json.main.temp,
               tempIcon: json.weather[0].icon,
            })
         } else {
            showWarning("Não encontramos esta localização!");
         }
      }
   });
   
   function showInfo(json) {
      showWarning("");
      document.querySelector(".resultado").style.display = "block";
      document.querySelector(".titulo").textContent = `${json.name}, ${json.country}`;
      document.querySelector(".temp__info").innerHTML = `${json.temp} <sup>ºC</sup>`;

      let image = document.querySelector(".image");
      image.src = `./images/${json.tempIcon}.png`
   }
   
   function showWarning(msg) {
      document.querySelector(".aviso").innerHTML = msg
   }
})();