import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

 var stateCityInfo = {"AB": ["Airdrie", "Alberta", "Balzac", "Beltline", "CALGARY", "Calgary", "Chestermere", "De Winton", "Division No. 6", "Downtown", "East Calgary", "Edgemont", "Edmonton", "Evergreen", "Highland Park", "Medicine Hat", "Midnapore", "Montreal", "North York", "Northeast Calgary", "Northwest Calgary", "Rockey View", "Rocky View", "Rocky View County", "Rocky View No. 44", "Rockyview", "Rockyview County", "SW Calgary", "Sage Hill", "Sainte-Ad\u00e8le", "Southeast Calgary", "Toronto", "calgary"], "AK": ["Berea", "Queen Creek"], "AL": ["Calgary", "Chandler", "Henderson Nevada"], "AR": ["Monticello"], "AZ": ["AZ", "Ahwahtukee", "Ahwatukee", "Ahwatukee Foothills Village", "Anthem", "Apache Junction", "Apache Trail", "Arizona", "Arrowhead", "Avondale", "Buckeye", "CAREFREE", "CAVE CREEK", "Carefree", "Cave Creek", "Cave Creek Road", "Cave creek", "Central", "Central City", "Central City Village", "Chander", "Chandler", "Chandler-Gilbert", "Desert Ridge", "East Mesa", "El Mirage", "Estrella Village", "Fort McDowell", "Fort Mcdowell", "Fountain Hills", "Fountain Hls", "GILBERT", "GIlbert", "GLENDALE", "GOODYEAR", "Gelndale", "Gilbert", "Glbert", "Glendale", "Glendale Az", "Goodyear", "Grand Canyon", "Greenway", "Guadalupe", "Higley", "LAVEEN", "Las Vegas", "Laveen", "Laveen Village", "Litchfield", "Litchfield Park", "Litchfield park", "MESA", "Maricopa", "Mesa", "Mesa AZ", "Mesa Arizona", "Metro Phoenix", "New River", "North Phoenix", "North Scottsdale", "Old Scottsdale", "Old Town Scottsdale", "PEORIA", "PHOENIX", "Paradise Valley", "Pasadena", "Peoria", "Pheonix", "Pheonix AZ", "Phoeniix", "Phoenix", "Phoenix ", "Phoenix AZ", "Phoenix Metro Area", "Phoenix Valley", "Phoenix,", "Phoenix, AZ", "Phoenx", "Phoneix", "Phoniex", "Phx", "QUEEN CREEK", "Queen Creek", "Queen creek", "Rainbow Valley", "Red Mountain", "Red Rock", "Rio Verde", "SCOTTSDALE", "SURPRISE", "San Tan", "San Tan Valley", "Schottsdale", "Scotesdale", "Scotsdale", "Scottdale", "Scottsale", "Scottsdale", "Scottsdale, AZ", "Sedona", "Snowflake", "Somerton", "Stetson Valley", "Sun CIty", "Sun City", "Sun City West", "Sun Lakes", "Suncity", "Sunnyslope", "Suprise", "Surprise", "Surprise Crossing", "TEMPE", "TOLLESON", "Tempe", "Tempe ", "The Promenade", "Tolleson", "Tucson", "Valleywide", "Waddell", "Westworld Scottsdale", "Youngtown", "cave creek", "glendale", "mesa", "peoria", "phoenix", "scottsdale", "surprise", "tempe", "\u200bChandler"], "BAS": ["Bath"], "BC": ["Richmond Hill"], "CA": ["Antioch", "Chandler", "Dublin", "Gilbert", "Huntington Beach", "Las Vegas", "Las Vegas Nv", "Los Angeles", "Monterey Park", "Morgan Hill", "Nationwide", "Peninsula", "Sacramento", "San Diego", "Scottadale", "Surprise", "Temecula"], "CON": ["Church Cove"], "CT": ["Farmington", "Glendale", "Litchfield"], "DOW": ["Down"], "DUR": ["Thornhill"], "FL": ["Gilbert", "Hudson", "Las Vegas", "Tampa"], "GA": ["Avondale", "Las Vegas"], "IL": ["Broadlands", "Champaign", "Dewey", "Fisher", "Fithian", "Gifford", "Homer", "Ivesdale", "Joliet", "Mahomet", "Mansfield", "Monticello", "Ogden", "Philo", "Rantoul", "Saint Joseph", "Savoy", "Schaumburg", "Sidney", "St Joseph", "St. Joseph", "Thomasboro", "Tolono", "Tuscola", "Urbana", "Urbana, Illinois", "Villa Grove"], "NC": ["Ballantyne", "Belmont", "Blakeney", "CHARLOTTE", "CONCORD", "Catawba Springs", "Char", "Charlotte", "Charlotte ", "Concord", "Concord Mills", "Cornelius", "Cramerton", "Crouse", "DENVER", "Dallas", "Davidson", "Denver", "Fort Mill", "GASTONIA", "Gastonia", "Greensboro", "Harrisbug", "Harrisburg", "Harrisburg,", "Huntersville", "Indian Trail", "Indian land", "Kannapolis", "Lake Norman", "Lake Park", "Las Vegas", "Locust", "Lowell", "Lowesville", "MATTHEWS", "Marvin", "Mathews", "Mattews", "Matthews", "Mc Adenville", "McAdenville", "Midland", "Mint  Hill", "Mint Hill", "Monroe", "Montgomery", "Mooresville", "Mount Holly", "Mt Holly", "Mt. Holly", "North Carolina", "North Charlotte", "Paw Creek", "Pineville", "Promenade", "Ranlo", "S Concord", "Sandy Ridge", "South Charlotte", "Stallings", "Stanley", "University", "Waxhaw", "Weddington", "Wesley Chapel", "Westport", "charlotte", "charlottte"], "NE": ["Las Vegas", "Omaha"], "NJ": ["Union"], "NM": ["Las Vegas"], "NV": ["Boulder City", "Centennial Hills", "Central Henderson", "City Center", "Clark", "Decatur", "Green Valley", "Henderson", "Lake Mead", "Las Vegas", "Nellis", "Nellis Air Force Base", "North Las Vegas", "Pahrump", "Paradise", "Seven Hills", "South Las Vegas", "Spring Valley", "Summerlin", "Sunrise", "Sunrise Manor", "W Henderson", "W Spring Valley", "Whitney"], "NY": ["Brooklyn", "Champlain", "Closter", "Mooers", "New York", "North Las Vegas", "Rouses Point"], "OH": ["AVON", "Akron", "Amherst", "Auburn", "Auburn Township", "Auburn Twp", "Aurora", "Avon", "Avon Lake", "Avon lake", "Bainbridge", "Bainbridge Township", "Barberton", "Bath", "Bay Village", "Beachwood", "Beachwood ", "Bedford", "Bedford Heights", "Bedford Hts", "Bedford Hts.", "Bentleyville", "Berea", "Boston Heights", "Bratenahl", "Brecksville", "Broadview Heights", "Broadview Hts", "Brook Park", "Brooklyn", "Brooklyn Heights", "Brooklyn Hts.", "Brookpark", "Brunswick", "Brunswick Hills", "Buckeye - Shaker", "Burton", "CLEVELAND", "Chagrin Falls", "Chardon", "Chargrin Falls", "Chesterland", "Cleveland", "Cleveland Heigh", "Cleveland Height", "Cleveland Heights", "Cleveland Hghts.", "Cleveland Hts.", "Cleveland, OH", "Columbia Sta", "Columbia Station", "Concord", "Concord Township", "Concord Twp", "Copley", "Cuyahoga Falls", "Cuyahoga Fls", "Cuyahoga Heights", "Cuyohoga Falls", "East Cleveland", "Eastlake", "Elyria", "Erie", "Euclid", "Fairlawn", "Fairport Harbor", "Fairview Park", "Garfield Heights", "Garfield Hts", "Garrettsville", "Gates Mills", "Geauga", "Grafton", "Grand River", "Grove City", "Highland Heights", "Highland Hills", "Highland Hts", "Hinckley", "Hiram", "Hudson", "Huntsburg", "Hyland Heights", "Independence", "Indian Trail", "Kent", "Kirtland", "LaGrange", "Lagrange", "Lakewood", "Lakewood, Oh", "Lindale", "Litchfield", "Lorain", "Lyndhurst", "Lynhurst", "MACEDONIA", "Macedonia", "Madison", "Mantua", "Maple Heights", "Mayfield", "Mayfield Heights", "Mayfield Heights (Cleveland)", "Mayfield Heights.", "Mayfield Hts", "Mayfield Hts.", "Mayfield Village", "Median", "Medina", "Medina Township", "Mentor", "Mentor On The Lake", "Mentor On the", "Mentor On the Lake", "Mentor-On-The-Lake", "Mentor-on-the-Lake", "Middleburg", "Middleburg Heights", "Middleburg Hts", "Middleburg Hts.", "Middlefield", "Milford", "Montrose", "Montville", "Moreland Hills", "Munroe Falls", "N Ridgeville", "N Solon", "N. Olmsted", "N. Randall", "N. Ridgeville", "Newburgh Heights", "Newbury", "North  Ridgeville", "North Olmstead", "North Olmsted", "North Olmsted,", "North Randall", "North Ridgeville", "North Royalton", "Northfield", "Northfield Center", "Northfield Center Township", "Norton", "Novelty", "Oakwood", "Oakwood Village", "Oakwood village", "Oberlin", "Old Brooklyn", "Olmsted Falls", "Olmsted Township", "Orange", "Orange Village", "PARMA HEIGHTS", "Painesville", "Painesville Township", "Parma", "Parma Heights", "Parma mid birth", "Peninsul", "Peninsula", "Pepper Pike", "Pepperpike", "Perry", "Perry Twp", "Ravenna", "Reminderville", "Richfield", "Richmond Height", "Richmond Heights", "Richmond Hts", "Rocky River", "Rocky river", "Russell Twp", "Sagamore Hills", "Seven Hills", "Shaker Heights", "Shaker Hts", "Sheffield", "Sheffield Lake", "Sheffield Village", "Silver Lake", "Solon", "South Amherst", "South Euclid", "South Russell", "Stow", "Streetsboro", "Strongsville", "Strongville", "Tallmadge", "Toronto", "Township of Concord", "Tremont", "Troy Township", "Twinsburg", "Twinsburgh", "University Heights", "University Ht", "University Hts ", "Uptown", "Valley City", "Valley View", "Wadsworth", "Walton Hills", "Warrensville", "Warrensville Heights", "Warrensville Hts", "Warrensville Hts.", "Warrenville", "Wellington", "West Lake", "Westlake", "Wickliffe", "Willoughby", "Willoughby Hills", "Willowick", "Woodmere", "Woodmere Village", "kirtland", "lyndhurst", "solon", "south Euclid"], "ON": ["AGINCOURT", "Agincourt", "Ajax", "Ansnorveldt", "Ashburn", "Aurora", "Beeton", "Bolton", "Bond Head", "Bradford", "Bradford West Gwillimbury", "Brampton", "Brooklin", "Burlington", "Caledon", "Caledon East", "Caledon Village", "Centre Island", "Claremont", "Clarkson", "Concord", "Cooksville", "Don Mills", "Downsview", "Downtown Toronto", "Durham Regional Municipality", "ETOBICOKE", "East Ajax", "East Credit", "East Gwilimbury", "East Gwillimbury", "East Hawkesbury", "East Mississauga", "East York", "Etibicoke", "Etobicoke", "Etobicoke,", "Etobiicoke", "Georgetown", "Glen Williams", "Goodwood", "Gormley", "Halton Hills", "Hamilton", "Holland Landing", "Inglewood", "Kettleby", "King", "King City", "Kleinburg", "Leaside", "Leslieville", "Malton", "Maple", "Markham", "Markham, ON", "Milton", "Missisauga", "Mississagua", "Mississauaga", "Mississauga", "Mississauge", "Mississaugua", "Mississuaga", "Mount Albert", "NEWMARKET", "NORTH YORK", "New Tecumseth", "Newmarket", "Nobleton", "North  York", "North Toronto", "North York", "North of Brampton", "North york", "NorthYork", "Northyork", "Norval", "Oak Ridges", "Oakridges", "Oakville", "Oshawa", "Palgrave", "Pickering", "Pickering Ajax Whitby", "Port Credit", "Queensville", "RIchmond Hill", "Regional Municipality of York", "Rexdale", "Richmond Hil", "Richmond Hill", "Richmonhill", "River Drive Park", "SCARBOROUGH", "Scarborough", "Scarbrough", "Scarobrough", "Schomberg", "Sharon", "Stouffville", "Streetsville", "THORNHILL", "TORONTO", "Thorncliffe Park", "Thornhil", "Thornhill", "Tornto", "Toronto", "Toronto Division", "Toronto Scarborough", "Toronto-Etobicoke", "Toronto-North York", "Toronto-West", "Tottenham", "Unionville", "Uxbridge", "Vaughan", "Vaughan Mills", "Vaughn", "Waterloo", "West Toronto", "Weston", "Whiitby", "Whitby", "Whitchurch-Stouffville", "Whtiby", "Willowdale", "Woodbridge", "Woodbridge (Vaughan)", "York", "York Regional Municipality", "Yorkdale", "Yorkville", "Zephyr", "etobicoke", "markham", "oakville", "toronto"], "PA": ["Aliquippa", "Allegheny", "Allentown", "Allison Park", "Ambridge", "Arnold", "Aspinwall", "Avalon", "Bakerstown", "Baldwin", "Banksville", "Belle Vernon", "Bellevue", "Bellvue", "Ben Avon", "Bethel Park", "Blawnox", "Bloomfield", "Boston", "Braddock", "Bradfordwoods", "Brentwood", "Bridgeville", "Brookline", "Buena Vista", "CARSON", "Canonsburd", "Canonsburg", "Carnegie", "Castle Shannon", "Cecil", "Central Oakland", "Chateau", "Cheswick", "Clairton", "Clinton", "Coraopolis", "Crafton", "Cranberry Township", "Cranberry Twp", "Creighton", "Crescent", "Cuddy", "Dormont", "Downtown", "Dravosburg", "Duquesne", "East Liberty", "East Mc Keesport", "East McKeesport", "East Pittsburgh", "Edgewood", "Eighty Four", "Elizabeth", "Elizabeth Township", "Elrama", "Emsworth", "Erie", "Etna", "Export", "Finleyville", "Forest Hills", "Fox Chapel", "Franklin Park", "Frazer", "Gibsonia", "Glassport", "Glenshaw", "Green Tree", "Hampton Township", "Harmar Township", "Harmarville", "Harrison City", "Harwick", "Heidelberg", "Hendersonville", "Herminie", "Homestead", "Imperial", "Indianola", "Ingomar", "Ingram", "Irwin", "Jefferson Hills", "Kennedy Township", "Lawrence", "Lawrenceville", "Leetsdale", "Library", "Lower Burrell", "Lower Lawrenceville", "Lower burrell", "MONROEVILLE", "Mc Donald", "Mc Kees Rocks", "Mc Murray", "McCandless", "McCandless Township", "McDonald", "McKees Rocks", "McKeesRocks", "McKeesport", "McKnight", "McMurray", "McMurry", "Mccandless Township", "Mcdonald", "Mckees Rocks", "Mckeesport", "Mcknight", "Mcmurray", "Midway", "Millvale", "Monongahela", "Monoroeville", "Monreoville", "Monroeville", "Moon", "Moon TWP", "Moon Township", "Moon Twp", "Moon Twp.", "Morgan", "Mount Lebanon", "Mount Oliver", "Mount Washington", "Mt Lebanon", "Mt. Lebanon", "Mt. Washington", "Munhall", "Murrysville", "Murrysville (Monroeville)", "Neville Island", "New Eagle", "New Kensington", "North Braddock", "North Hills", "North Huntingdon", "North Huntington", "North Strabane Township", "North Versailles", "Nottingham Township", "O'hara Township", "Oakdale", "Oakland", "Oakmont", "Penn Hills", "Penn Hills Township", "Pennsylvania", "Peters Township", "Pgh Int Arprt", "Pine", "Pitcairn", "Pittsburch", "Pittsburg", "Pittsburgh", "Pittsburgh ", "Pleasant Hills", "Plum", "Plum Boro", "Port Vue", "Presto", "Rankin", "Regent Square", "Richland Township", "Rillton", "Robinson", "Robinson Township", "Robinson Twp.", "Ross", "Ross Township", "Rostraver", "Rural Ridge", "Russellton", "Sewickley", "Shady Side", "Shadyside", "Shaler", "Shaler Township", "Sharpsburg", "Side Slopes", "South Hills", "South Park", "South Park Township", "Southside Flats", "Spring Hill City View", "Springdale", "Squirrel Hill", "St.Pittsburgh", "Strip District", "Sturgeon", "Sutersville", "Swissvale", "Tarentum", "Trafford", "Turtle Creek", "Upper Saint Clair", "Upper St Clair", "Upper St. Clair", "Valencia", "Venetia", "Verona", "Warrendale", "West Elizabeth", "West Homestead", "West Mifflin", "West View", "Westview", "Wexford", "White Oak", "Wildwood", "Wilkens Township", "Wilkins Township", "Wilkinsburg", "Wilmerding", "moon", "springdale"], "QC": ["Ange-Gardien", "Anjou", "Baie-d'Urfe", "Baie-d'Urf\u00e9", "Beaconsfield", "Beauharnois", "Bedford", "Beloeil", "Bel\u0153il", "Blainville", "Bois-des-Filion", "Boisbriand", "Boucherville", "Brossard", "Brownsburg-Chatham", "Candiac", "Chambly", "Charlemagne", "Chatauguay", "Chateauguay", "Chertsey", "Chomedey, Laval", "Ch\u00e2teauguay", "Communaut\u00e9-Urbaine-de-Montr\u00e9al", "Cote Saint Luc", "Cote Saint-Luc", "Cote-Saint-Luc", "Coteau-du-Lac", "C\u00f4te Saint-Luc", "C\u00f4te-Saint-Luc", "De l'Eglise", "Delson", "Deux-Montagnes", "Deux-Montagnes Regional County Municipality", "Dollard-Des Ormeaux", "Dollard-Des-Ormeaux", "Dollard-des Ormeaux", "Dollard-des-Ormeaux", "Dorval", "Est\u00e9rel", "Fabreville", "Farnham", "Godmanchester", "Greenfield Park", "Hampstead", "Hemmingford", "Henryville", "Hudson", "Huntingdon", "Iberville", "Joliette", "Kahnawake", "Kirkland", "L'Assomption", "L'assomption", "L'ile-Bizard", "L'ile-Perrot", "L'\u00cele-Bizard", "L'\u00cele-Perrot", "La Prairie", "La Salle", "LaSalle", "Lachenaie", "Lachine", "Lachute", "Lacolle", "Lasalle", "Laval", "Laval, Pont Viau", "Laval, Ste Dorothee", "Lavaltrie", "Le Haut-Saint-Laurent Regional County Municipality", "Le Sud-Ouest", "Les Coteaux", "Les C\u00e8dres", "Longueuil", "Maple Grove", "Mascouche", "McMasterville", "Mercier", "Mirabel", "Mont St-hilaire", "Mont-Royal", "Mont-Saint-Gr\u00e9goire", "Mont-Saint-Hilaire", "Montral", "Montreal", "Montreal-Est", "Montreal-Nord", "Montreal-Ouest", "Montreal-Quest", "Montreal-West", "Montr\u00e8al", "Montr\u00e9al", "Montr\u00e9al (Qu\u00e9bec)", "Montr\u00e9al-Est", "Montr\u00e9al-Nord", "Montr\u00e9al-Ouest", "Montr\u00e9al-West", "Mont\u00e9al", "Morin-Heights", "Napierville", "Notre-Dame-De-L'ile-Perrot", "Notre-Dame-de-l'Ile-Perrot", "Noyan", "Oka", "Old Port of Montreal", "Ormstown", "Otterburn Park", "Outremont", "Piedmont", "Pierrefonds", "Pincourt", "Point-Claire", "Pointe Claire", "Pointe-Aux-Trembles", "Pointe-Calumet", "Pointe-Claire", "Pointe-aux-Trembles", "Pr\u00e9vost", "Quartier des Spectacles", "Qu\u00e9bec", "Rawdon", "Repentigny", "Rigaud", "Rosemere", "Rosem\u00e8re", "Rougemont", "Roxboro", "Saint - Hyacinthe", "Saint Laurent", "Saint Leonard", "Saint-Basile-Le-Grand", "Saint-Basile-le-Grand", "Saint-Bernard de Lacolle", "Saint-Bernard-de-Lacolle", "Saint-Bruno", "Saint-Bruno-de-Montarville", "Saint-Charles-Borromee", "Saint-Constant", "Saint-Eustache", "Saint-Henri", "Saint-Hippolyte", "Saint-Hubert", "Saint-Hyacinthe", "Saint-Isidore-de-Laprairie", "Saint-Jean-Sur-Richelieu", "Saint-Jean-sur-Richelieu", "Saint-Jerome", "Saint-J\u00e9r\u00f4me", "Saint-Lambert", "Saint-Laurent", "Saint-Lazare", "Saint-Leonard", "Saint-L\u00e9onard", "Saint-Marc-sur-Richelieu", "Saint-Philippe", "Saint-Pie", "Saint-Pierre-de-V\u00e9ronne-\u00e0-Pike-River", "Saint-Roch-de-l'Achigan", "Saint-Sauveur", "Saint-Sauveur-des-Monts", "Saint-laurent", "Sainte-Adele", "Sainte-Ad\u00e8le", "Sainte-Anne-De-Bellevue", "Sainte-Anne-de-Bellevue", "Sainte-Anne-des-Plaines", "Sainte-Catherine", "Sainte-Doroth\u00e9e", "Sainte-Genevieve", "Sainte-Genevi\u00e8ve", "Sainte-Julie", "Sainte-Madeleine", "Sainte-Marguerite-Esterel", "Sainte-Marguerite-du-Lac-Masson", "Sainte-Marguerite-du-lac-Masson", "Sainte-Marthe", "Sainte-Rose", "Sainte-Therese", "Sainte-Th\u00e9r\u00e8se", "Sainte-Th\u00e9r\u00e8se-de-Blainville", "Sainte-th\u00e9r\u00e8se", "Saintt-Bruno-de-Montarville", "Salaberry-De-Valleyfield", "Salaberry-de-Valleyfield", "St Leonard", "St-Beno\u00eet de Mirabel", "St-Bruno-de-Montarville", "St-Clet", "St-Jean-sur-Richelieu", "St-Jerome", "St-Laurent", "St-Lazare", "St-Leonard", "St. Jean Sur Richelieu", "St. Leonard", "St. L\u00e9onard", "St. Sauveur", "Ste-Doroth\u00e9e", "Ste-Rose", "Ste-Therese-de-Blainville", "Terrebonne", "Val-Morin", "Varennes", "Vaudreuil", "Vaudreuil-Dorion", "Venise-en-Qu\u00e9bec", "Verdun", "Vieux-Montr\u00e9al", "Ville Mont-Royal", "Ville Saint Laurent", "Vimont", "West Montr\u00e9al", "Westmount", "montreal", "verdun", "\u00cele des Soeurs", "\u00cele-des-Soeurs"], "SC": ["Charlotte", "Clover", "Darlington", "FORT MILL", "Fort  Mill", "Fort Mill", "Fort mill", "Ft. Mill", "INDIAN LAND", "Indian Land", "Indian Land,", "Indian land", "Lake Wylie", "Lancaster", "Rock Hill", "Rock Hill SC", "Spartanburg", "Tega Cay", "York"], "TN": ["Chattanooga"], "TX": ["Austin", "Dallas", "Las Vegas", "Lufkin", "Phoenix"], "UT": ["Draper"], "VA": ["Moseley", "Pittsburgh"], "VT": ["Alburg", "Alburgh"], "WA": ["Canonsburg", "Kirkland", "Puyallup"], "WI": ["Belleville", "Berry", "Black Earth", "Blue Mounds", "Brooklyn", "Columbus", "Cottage Grove", "Cross Plains", "Dane", "De Forest", "DeForest", "Deerfield", "Deforest", "Fitchburg", "Fitchburgh", "Lodi", "MADISON", "Madison", "Marshall", "Mc Farland", "McFarland", "Mcfarland", "Middleton", "Monona", "Mount Horeb", "Mt. Horeb", "New Glarus", "Oregon", "Paoli", "SUN PRAIRIE", "Sauk City", "Seattle", "Shorewood Hills", "Stoughton", "Sun Praiie", "Sun Prairie", "Verona", "Waunakee", "Windsor"], "XGL": ["London"], "XGM": ["Bury", "Manchester", "Oldham", "Sale"], "XWY": ["Leeds"]}

export default class UploadImage extends Component {

  constructor(props) {
    super(props);

    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeLabel = this.onChangeLabel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      label:'',
      city: '',
      state: '',
      file: null,
      imagePreviewUrl: '',
      imagePreview: null,
    }
  }

  componentDidMount() {
    //Get html elements
    var stateSel = document.getElementById("stateSel");

    //Load states
    for (var state in stateCityInfo) {
      stateSel.options[stateSel.options.length] = new Option(state, state);
    }
  }

  componentDidUpdate(prevProps, prevState) {
	 //  console.log(
	 //    `this.state.clickCounts(♻️ componentDidUpdate)`,
	 //    this.state.state, this.state.city
		// )
	}

  onChangeImage(e) {
	  e.preventDefault();
	  var reader = new FileReader();
	  var file = e.target.files[0];
	  reader.onloadend = () => {
	    this.setState({
	      file: file,
	      imagePreviewUrl: reader.result
	    });
	  }
	  reader.readAsDataURL(file)
	}

  onChangeLabel(e) {
    this.setState({
      label: e.target.value
    });
  }

  onChangeState(e) {
    var stateSel = document.getElementById("stateSel");
    var citySel = document.getElementById("citySel");
    citySel.length = 1; // remove all options bar first
    if (this.selectedIndex < 1) {
      return;
    }
    var cities = stateCityInfo[stateSel.value];
    for (var i = 0; i < cities.length; i++) {
      citySel.options[citySel.options.length] = new Option(cities[i], cities[i]);
    }
    this.setState({
      state: stateSel.value
    });
  }

  onChangeCity(e) {
    this.setState(
      {city: e.target.value},
    );
  }

  onSubmit(e) {
    e.preventDefault();

    // console.log(`Form submitted:`);
    // console.log(`Label: ${this.state.label}`);
    // console.log(`City: ${this.state.city}`);
    // console.log(`State: ${this.state.state}`);
    // console.log(`File: ${this.state.file}`);

    const data = new FormData();
    data.set('label', this.state.label);
    data.set('state', this.state.state);
    data.set('city', this.state.city);
    data.append('file', this.state.file);
    axios.post("http://localhost:8000/upload", data, {
    })
    .then(res => {
      this.props.history.push({
			  pathname: '/results',
			  state: { query_result: res.data["query_result"], input_file:res.data["input_file"] }
			});
    });

    this.setState({
      label: '',
      city: '',
      state: '',
      file: null,
      imagePreviewUrl: '',
      imagePreview: null,
    });
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="user input" />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div style={{marginTop: 10}}>
        <h3>Upload your Image</h3>
        <form onSubmit={this.onSubmit}>
          <label>Label: </label>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input  className="form-check-input"
                      type="radio"
                      name="labelOptions"
                      id="labelFood"
                      value="Food"
                      onChange={this.onChangeLabel}
                      />
              <label className="form-check-label">Food</label>
            </div>

            <div className="form-check form-check-inline">
              <input  className="form-check-input"
                      type="radio"
                      name="labelOptions"
                      id="labelDrink"
                      value="Drink"
                      onChange={this.onChangeLabel}
                      />
              <label className="form-check-label">Drink</label>
            </div>

            <div className="form-check form-check-inline">
              <input  className="form-check-input"
                      type="radio"
                      name="labelOptions"
                      id="labelInside"
                      value="Inside"
                      onChange={this.onChangeLabel}
                      />
              <label className="form-check-label">Inside</label>
            </div>

            <div className="form-check form-check-inline">
              <input  className="form-check-input"
                      type="radio"
                      name="labelOptions"
                      id="labelOutside"
                      value="Outside"
                      onChange={this.onChangeLabel}
                      />
              <label className="form-check-label">Outside</label>
            </div>
          </div>

          <div className="stateComponent">
          <label>State: </label>
          <select id="stateSel" size="1" onChange={this.onChangeState}>
            <option value="">-- Select State--</option>
          </select>
          </div>

          <div className="stateComponent">
          <label>City: </label>
          <select id="citySel" size="1" onChange={this.onChangeCity}>
            <option value="">-- Select City--</option>
          </select>
          </div>

          <div className="previewComponent">
            <label>Image: </label>
            <input className="fileInput"
                  type="file"
                  onChange={(e)=>this.onChangeImage(e)} />
            <div className="imgPreview">{$imagePreview}</div>
          </div>

          <div className="form-group">
            <input type="submit" value="Upload"
                  className="btn btn-primary"/>
          </div>
        </form>
      </div>
    )
  }
}
