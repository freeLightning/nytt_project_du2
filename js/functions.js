
// G
// CODE According to specification
function click_filter_element (event) {
  /*
    ARGUMENTS
      event: event-object created when user clicks on one of the filter elements.

    SIDE-EFFECTS
      Marks the clicked filter element as selected / unselected.
      Since a filter element will have changed after the click, the list of
      programmes must be updated.

      Attention VG
      Careful with the propagation of the click-event

    NO RETURN VALUE

  */
  event.currentTarget.classList.toggle("selected");
  update_programmes();
}


// G
// CODE according to specification
function create_filter_element (data) {
  /*
    ARGUMENTS
      data: object that contains the following keys:
        class (string): a class-name given to the created element
        textContent (string): the text that the element contains
        parent (reference to HTML-element): the HTML-element that is the parent of the created element

      No control of arguments.

    SIDE-EFFECTS
      Creates a new dom-element with the tag "li".
      Gives the new dom-element the class contained in data.class
      Appends the new dom-element to the element referenced in data.parent
      Sets the text content of the new dom-element to data.textContent
      Sets the function click_filter_element as a listener to "click" for the new dom-element

    RETURN VALUE
      Returns a reference to the new dom-element
  */
  let filter_elements = document.createElement("li");
  filter_elements.classList.add(data.class);
  filter_elements.textContent = data.textContent;
  data.parent.appendChild(filter_elements);
  filter_elements.addEventListener("click", click_filter_element);
  
  return filter_elements;
}


// VG
// CODE according to specification
function add_group_toggling (filter_container_dom) {

  /*
    ARGUMENT
      filter_container_dom: reference to a HTML-element that contains a set of fliter_elements
            Exempel: the <ul> that contains the filters for Language.

    SIDE EFFECTS
      The function makes sure that when the user clicks on filter_container_dom, all the
      filter_elements that it contains are selected / unselected.
      Since some filter elements will have changed after the click, the list of
      programmes must be updated.

    NO RETURN VALUE

  */
  
}


// VG
// CODE according to specifications
function toggle_cities (event) {

  /*

    ARGUMENTS
      This function does not take any arguments

    SIDE EFFECTS
      This function checks the state of the first city-filter-element (Madrid).
      If it is selected then it de-selects ALL city-filter-elements
      If it is de-selected then it selects ALL city-filter-elements 

    NO RETURN VALUE

  */

}


// WRITE SPECIFICATION
// ATTENTION: You need to write the specification of all three functions:
//            create_countries_cities_filters, create_country and create_city
function create_countries_cities_filters () {
  /* 
  ARGUMENTS
    This function doesn't take any arguments.
    SIDE-EFFECTS
    Each element in the array COUNTRIES gets called as an argument in create_country.
    RETURN VALUE
    None. 
    */
  function create_country (country) {
    /* 
    ARGUMENTS
    This function takes an object from array COUNTRIES that contains the following keys:
    id (number): the country id
    name (string): the country name
    imagesNormal (array of strings): country images    
    
    SIDE-EFFECTS
    This function creates a new dom-element and gives it two classes, ???country??? and ???filter_container???,
    sets a new id ???country_??? and country.id.
    Appends the new dom-element to "#country_filter > ul".
    Sets the new dom-element through innerHTML a country name and a ul.
    For each element in the array CITIES that are in the country gets called as an argument in create_city.
    RETURN VALUE
    None.
    */
    const dom = document.createElement("div");
    dom.classList.add("country");
    dom.classList.add("filter_container");
    dom.id = "country_" + country.id;
    document.querySelector("#country_filter > ul").append(dom);
    
    dom.innerHTML = `
      <h1>${country.name}</h1>
      <ul class="filter_list"></ul>
    `;
    
    const cities = array_filter(CITIES, test_function);
    function test_function (city) {
      return city.countryID === country.id;
    }

    array_each(cities, create_city);
  }
  function create_city (city) {
  /* 
  ARGUMENTS
  This function takes an object from the array cities as an argument: city
  SIDE-EFFECTS
  This function creates a new dom-element and gives it the parent "#country_${city.countryID} > ul"
  Gives the new dom-element the class "selected"
  Sets the text content of the new dom-element to city.name
  Sets dataset.id to city.id
  RETURN VALUE
  None.
  */

    const dom = create_filter_element({
      parent: document.querySelector(`#country_${city.countryID} > ul`),
      class: "selected",
      textContent: city.name,
    });
    dom.dataset.id = city.id;

  }
  array_each(COUNTRIES, create_country);
}


// G
// ABSTRACT AND WRITE SPECIFICATION
//    As you can see, all three functions below do basically the same thing.
//    Abstract them to one function, and write the specification of that function.
function create_levels_filter () {
  /*
  ARGUMENTS
  This function doesn't take any arguments.
  SIDE EFFECTS
  This function creates a new li element for each element in array LEVELS, SUBJECTS and
  LANGUAGE. 
  Sets the li element to the correct filter ul/parent.
  Sets the class to "selected".
  Sets the text content to the the elements name.
  RETURN VALUE
  None.
  */

  // Fungerar ej - VARF??R?????
/*     const filter_name = ["level", "subject", "language"];

    function create_filters (filter) {

      const dom = create_filter_element ({
        parent: document.querySelector(`#${filter_name[i]}_filter > ul`),
        class: "selected",
        textContent: filter.name,
      });
      dom.dataset.id = filter.id;

    }  
    let i = 0;
    array_each(LEVELS, create_filters);
    number = 1;
    array_each(SUBJECTS, create_filters);
    number = 2;
    array_each(LANGUAGES, create_filters);
}
 */  
  function create_level (level) {
    const dom = create_filter_element({
      parent: document.querySelector("#level_filter > ul"),
      class: "selected",
      textContent: level.name,
    });
    dom.dataset.id = level.id;
  }
  array_each(LEVELS, create_level);
}
// Create Subjects Filter
function create_subjects_filter () {
  function create_subject (subject) {
    const dom = create_filter_element({
      parent: document.querySelector("#subject_filter > ul"),
      class: "selected",
      textContent: subject.name,
    });
    dom.dataset.id = subject.id;
  }
  array_each(SUBJECTS, create_subject);
}
// Create Search Field
function create_language_filter () {
  function create_element (data) {
    const dom = create_filter_element({
      parent: document.querySelector("#language_filter > ul"),
      class: "selected",
      textContent: data.name,
    });
    dom.dataset.id = data.id;
  }
  array_each(LANGUAGES, create_element);
}


// G / VG (see details in specification)
// CODE according to specifications
function create_programme (programme) {
  
  /*

    ARGUMENT
      programme (object): One of the objects from PROGRAMMES

    SIDE-EFFECTS
      This function creates the HTML-element that contains all the information
      about one programme, as seen in the video / image.
      
      VG: The background image is a random image from among the images of the city
          in which the programme is (via the university)
      G:  No background image required.


      VG: The "see more" interaction must be included.
      G:  The "see more" element is not required. And that information needs not be in place.

    NO RETURN VALUE

  */ 
    let programe_dom = document.createElement("div");
    let program_parent_dom = document.querySelector("#programmes > ul");
    programe_dom.classList.add("programme");
  
    let programe_city_id = UNIVERSITIES[programme.universityID].cityID;
    let programe_univeristy_name = UNIVERSITIES[programme.universityID].name;
    let city_text = CITIES[programe_city_id].name
  
    let programe_country_id = CITIES[programe_city_id].countryID;
    let programe_country_text = COUNTRIES[programe_country_id].name;
  
    let program_level_text = LEVELS[programme.levelID - 1].name;
    let program_subject_text = SUBJECTS[programme.subjectID].name;
    let program_language_text = LANGUAGES[programme.languageID].name;
  
    let procent = percenter(CITIES[programe_city_id].sun, 365);
    let avarge_rate_text = 0;
    function each_rate_function(each_rate) {
      avarge_rate_text = avarge_rate_text + each_rate / programme.successRate.length;
    }
    array_each(programme.successRate, each_rate_function)
    programe_dom.innerHTML =` 
          <div>
            <h1>${programme.name}</h1>
            <p>${programe_univeristy_name}</p>
            <p>${programe_country_text}, ${city_text}</p>
            <p>${program_level_text}, ${program_subject_text}, ${program_language_text}</p>
          </div>
          <div class="bottom_programme">sun-index: ${CITIES[programe_city_id].sun}: ${procent}%</div>`
      ;
    program_parent_dom.appendChild(programe_dom);
}


// G
// CODE according to the specification
function update_programmes () {

  /*
      NO ARGUMENTS

      SIDE EFFECTS
        This function updates the programmes shown on the page according to
        the current filter status (which filter elements are selected / unselected).
        It uses the function read_filters to know which programmes need to be included.

        VG: The top images (header) need to be updated here

      NO RETURN VALUE

  */
      let previous_programmes_doms = document.querySelector("#programmes > ul");
      previous_programmes_doms.innerHTML = "";
    
      let programs_selected_array = read_filters()
      let no_programs_text = document.querySelector("p");

      array_each(programs_selected_array, create_programme)
      if (previous_programmes_doms.innerHTML === "") {
        no_programs_text.style.display = "block";
      }
      if (previous_programmes_doms.innerHTML !== "") {
        no_programs_text.style.display = "none";
      }
}


// G
// WRITE SPECIFICATION
// You must understand how this function works. There will be questions about it
// in the code review (kodredovisning)

// Optional VG: Which parts of the function's code could be abstracted?
//              Implement it
function read_filters () {
    /*
  NO ARGUMENTS

  SIDE-EFFECTS
  This function creates an array "programmes" which includes all the programmes
  (from the array PROGRAMMES) that includes what filters, city, level, subject, languages
  that is selected, as well as any value taken from the search-field.
  
  RETURN VALUE
  Programmes
  */
    
  const city_selected_dom = document.querySelectorAll("#country_filter li.selected");

  const city_id_selected = [];
  function callback_add_cityID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    city_id_selected.push(id_as_integer);
  }
  array_each(city_selected_dom, callback_add_cityID);

  const universities = [];
  for (let i = 0; i < city_id_selected.length; i++) {
    const city_id = city_id_selected[i];
    for (let ii = 0; ii < UNIVERSITIES.length; ii++) {
      const university = UNIVERSITIES[ii];
      if (university.cityID === city_id) {
        universities.push(university);
      }
    }
  }

  let programmes = [];
  function callback_add_programmes (university) {
    const university_id = university.id;
    for (let i = 0; i < PROGRAMMES.length; i++) {
      const programme = PROGRAMMES[i];
      if (programme.universityID === university_id) {
        programmes.push(programme);
      }
    }
  }
  array_each(universities, callback_add_programmes);



  const level_selected_dom = document.querySelectorAll("#level_filter li.selected");
  const level_id_selected = [];
  function callback_add_levelID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    level_id_selected.push(id_as_integer);
  }
  array_each(level_selected_dom, callback_add_levelID);

  function test_function_level (programme) {
    return level_id_selected.includes(programme.levelID);
  }
  programmes = array_filter(programmes, test_function_level);



  const language_selected_dom = document.querySelectorAll("#language_filter li.selected");
  const language_id_selected = [];
  function callback_add_languageID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    language_id_selected.push(id_as_integer);
  }
  array_each(language_selected_dom, callback_add_languageID);



  function test_function_language (programme) {
    return language_id_selected.includes(programme.languageID);
  }
  programmes = array_filter(programmes, test_function_language);



  const subject_selected_dom = document.querySelectorAll("#subject_filter li.selected");
  const subject_id_selected = [];
  function callback_add_subjectID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    subject_id_selected.push(id_as_integer);
  }
  array_each(subject_selected_dom, callback_add_subjectID);



  function test_function_subject (programme) {
    return subject_id_selected.includes(programme.subjectID);
  }
  programmes = array_filter(programmes, test_function_subject);



  const search_string = document.querySelector("#search_field input").value;
  if (search_string !== "") {
    function test_function (programme) {
      return programme.name.includes(search_string);
    }
    programmes = array_filter(programmes, test_function);
  }

  return programmes;
}