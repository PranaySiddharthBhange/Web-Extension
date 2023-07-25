//This array stores all meanings of selected words
var allMeanings = [];


//function to fetch meaning from selected word
async function fetchWordMeaning(word) {

  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  try {
    const response = await fetch(apiUrl);

    // Checking if the response status is not OK (e.g., 404 or 500 error)
    if (!response.ok) {
      throw new Error(`Failed to fetch. Status: ${response.status}`);
    }

    const data = await response.json();

    // Checking if the API returned any data
    if (!data || data.length === 0) {
      throw new Error('No data found for the word.');
    }

    //API response is an array, and we'll take the first element
    const wordData = data[0];

    // Checking if the wordData contains meanings
    if (!wordData.meanings || wordData.meanings.length === 0) {
      throw new Error('No meanings found for the word.');
    }



    // Loop through each entry
    for (const entry of data) {

      // Checking if the entry contains meanings
      if (entry.meanings && entry.meanings.length > 0) {
        // Retrieve the meanings of the first part of speech
        const firstPartOfSpeech = entry.meanings[0];
        // Check if the first part of speech has definitions
        if (firstPartOfSpeech.definitions && firstPartOfSpeech.definitions.length > 0) {
          // Add the first definition to the array
          for (const definition of firstPartOfSpeech.definitions) {
            allMeanings.push(definition.definition);
            // console.log(definition.definition);
          }
        }
      }
    }


  

  }
  catch (error) {
    console.error('Error fetching word meaning:', error.message);
    return null;

  }
}




document.addEventListener("mouseup", function (event) {

  const selectedText = window.getSelection().toString().trim();


  if (selectedText) {

    fetchWordMeaning(selectedText)
      .then(meaning => {

        if (meaning) {


          const meaningsContainer = document.createElement("div");
          meaningsContainer.style.position = "absolute";
          meaningsContainer.style.top = event.clientY - 30 + "px";
          meaningsContainer.style.left = event.clientX + "px";
          meaningsContainer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
          meaningsContainer.style.color = "#fff";
          meaningsContainer.style.padding = "4px";
          meaningsContainer.style.borderRadius = "4px";
          meaningsContainer.style.zIndex = "9999";

          allMeanings.forEach((meaning, index) => {
            const meaningElement = document.createElement("p");

            meaningElement.textContent = `Meaning ${index + 1}: ${meaning}`;
            meaningsContainer.appendChild(meaningElement);
          });
          document.body.appendChild(meaningsContainer);



          document.addEventListener("click", function (event) {
            meaningsContainer.remove();
          });

          // setTimeout(function () {
          //   meaningsContainer.remove();
          // }, 5000);




          console.log(allMeanings);



          setTimeout(function () {
            tooltip.remove();
          }, 5000);


        }
        else {
          console.log('Failed to fetch the meaning of the word.');
        }
      })
      .catch(err => {
        console.error('An unexpected error occurred:', err);
      });

  }
});



















































































































































       // const tooltip = document.createElement("div");
          // tooltip.textContent = meaning;
          // tooltip.style.position = "absolute";
          // tooltip.style.top = event.clientY - 30 + "px";
          // tooltip.style.left = event.clientX + "px";
          // tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
          // tooltip.style.color = "#fff";
          // tooltip.style.padding = "4px";
          // tooltip.style.borderRadius = "4px";
          // tooltip.style.zIndex = "9999";
          // document.body.appendChild(tooltip);



          // const seemore = document.createElement("button");
          // seemore.textContent = "See More";
          // seemore.style.zIndex="99999";
          // seemore.style.backgroundColor="black";
          // seemore.style.color="white";
          // tooltip.appendChild(seemore);

          // seemore.addEventListener("click", function () {

          //   tooltip.remove();

          //   if (!tooltip.contains(seemore.nextElementSibling)) {
          //     const meaningsContainer = document.createElement("div");

          //     meaningsContainer.textContent = meaning;
          //     meaningsContainer.style.position = "absolute";
          //     meaningsContainer.style.top = event.clientY - 30 + "px";
          //     meaningsContainer.style.left = event.clientX + "px";
          //     meaningsContainer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
          //     meaningsContainer.style.color = "#fff";
          //     meaningsContainer.style.padding = "4px";
          //     meaningsContainer.style.borderRadius = "4px";
          //     meaningsContainer.style.zIndex = "9999";

          //     allMeanings.forEach((meaning, index) => {
          //       const meaningElement = document.createElement("p");

          //       meaningElement.textContent = `Meaning ${index + 1}: ${meaning}`;
          //       meaningsContainer.appendChild(meaningElement);
          //     });
          //     document.body.appendChild(meaningsContainer);
          //   }
          // }
          // );






          // document.addEventListener("click", function (event) {
          //   if (!tooltip.contains(event.target)) {
          //     tooltip.remove();

          //   }
          // });

          // document.addEventListener("click", function () {
          //   document.removeEventListener("click", clickHandler);
          // });


          // tooltip.addEventListener("mouseleave", function () {
          //   document.addEventListener("click", clickHandler);
          // });


          // function clickHandler(event) {
          //   tooltip.remove();

          // }






















    // Return the first definition as an example enter at end of fetch function
    // return firstPartOfSpeech.definitions[0].definition;


      // // Retrieve the meanings of the first part of speech
      // const firstPartOfSpeech = wordData.meanings[0];

      // // Checkiing if the first part of speech has definitions
      // if (!firstPartOfSpeech.definitions || firstPartOfSpeech.definitions.length === 0) {
      //   throw new Error('No definitions found for the word.');
      // }
