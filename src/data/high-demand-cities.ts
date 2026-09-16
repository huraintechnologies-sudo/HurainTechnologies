export interface HighDemandCity {
  countrySlug: string;
  cities: string[]; // Top 50 cities per country
}

export const highDemandCities: HighDemandCity[] = [
  {
    countrySlug: "united-states",
    cities: ["new-york", "los-angeles", "chicago", "houston", "phoenix", "philadelphia", "san-antonio", "san-diego", "dallas", "san-jose", "austin", "jacksonville", "miami", "new-orleans", "atlanta", "denver", "seattle", "boston", "portland", "las-vegas", "washington-dc", "minneapolis", "detroit", "minneapolis", "charlotte", "san-francisco", "nashville", "memphis", "baltimore", "louisville", "milwaukee", "albuquerque", "mesa", "virginia-beach", "long-beach", "oakland", "miami-gardens", "tucson", "fresno", "sacramento", "kansas-city", "mesa", "virginia-beach", "atlanta", "phoenix", "philadelphia", "san-antonio"],
  },
  {
    countrySlug: "united-kingdom",
    cities: ["london", "manchester", "birmingham", "leeds", "bristol", "edinburgh", "glasgow", "sheffield", "nottingham", "coventry", "leicester", "cambridge", "brighton", "oxford", "cambridge", "bath", "york", "windsor", "canterbury", "hull", "bradford", "southampton", "portsmouth", "stoke-on-trent", "wolverhampton", "chester", "exeter", "chester", "truro", "swansea", "cardiff", "belfast", "dublin", "cork", "galway", "limerick", "waterford", "drogheda", "dundalk", "athlone", "sligo", "letterkenny"],
  },
  {
    countrySlug: "india",
    cities: ["mumbai", "delhi", "bangalore", "hyderabad", "Chennai", "kolkata", "pune", "ahmedabad", "jaipur", "lucknow", "chandigarh", "indore", "thane", "bhopal", "visakhapatnam", "vadodara", "ghaziabad", "ludhiana", "agra", "nashik", "faridabad", "meerut", "rajkot", "kalyan", "vasai", "varanasi", "srinagar", "aurangabad", "dhanbad", "amritsar", "navi-mumbai", "allahabad", "ranchi", "howrah", "coimbatore", "jabalpur", "gwalior", "vijayawada", "jodhpur", "madurai", "raipur", "salem", "yamunanagar", "kozhikode", "davanagere"],
  },
  {
    countrySlug: "united-arab-emirates",
    cities: ["dubai", "abu-dhabi", "sharjah", "ajman", "ras-al-khaimah", "umm-al-quwain", "fujairah", "jebel-ali", "al-baraha", "bur-dubai", "deira", "jumeirah", "marina", "downtown-dubai", "palm-jumeirah", "business-bay", "creek-harbor", "deira", "bur-dubai", "al-karama", "al-manara", "al-wasl", "al-safa", "al-satwa", "umm-suqeim", "al-baraha", "al-karama", "al-manara", "al-wasl", "al-safa", "al-satwa", "umm-suqeim", "mirdif", "karama", "manara", "wasl", "safa", "satwa", "umm-suqeim"],
  },
  {
    countrySlug: "germany",
    cities: ["berlin", "munich", "hamburg", "cologne", "frankfurt", "stuttgart", "dusseldorf", "dortmund", "essen", "leipzig", "bremen", "hannover", "nuremberg", "mannheim", "augsburg", "wiesbaden", "gelsenkirchen", "aachen", "mönchengladbach", "braunschweig", "chemnitz", "kiel", "magdeburg", "freiburg", "mainz", "trier", "koblenz", "saarbrucken", "heidelberg", "potsdam", "bamberg", "würzburg", "regensburg", "ingolstadt", "erlangen", "furth", "ludwigsburg", "esslingen", "reutlingen", "tubingen", "konstanz", "freiberg", "zwickau", "plauen", "görlitz", "pirna"],
  },
  {
    countrySlug: "united-kingdom",
    cities: ["london", "manchester", "birmingham", "leeds", "bristol", "edinburgh", "glasgow", "sheffield", "nottingham", "coventry", "leicester", "cambridge", "brighton", "oxford", "cambridge", "bath", "york", "windsor", "canterbury", "hull", "bradford", "southampton", "portsmouth", "stoke-on-trent", "wolverhampton", "chester", "exeter", "chester", "truro", "swansea", "cardiff", "belfast", "dublin", "cork", "galway", "limerick", "waterford", "drogheda", "dundalk", "athlone", "sligo", "letterkenny"],
  },
  {
    countrySlug: "canada",
    cities: ["toronto", "vancouver", "montreal", "calgary", "ottawa", "winnipeg", "quebec-city", "hamilton", "edmonton", "kitchener", "london", "halifax", "victoria", "windsor", "saskatoon", "st-johns", "lethbridge", "barrie", "guelph", "london", "cambridge", "waterloo", "brantford", "st-catharines", "niagara-falls", "kingston", "peterborough", "oshawa", "durham", "ajax", "whitby", "pickering", "newmarket", "aurora", "vaughan", "brampton", "mississauga", "oakville", "burlington", "hamilton", "dundas", "stoney-creek", "grimsby"],
  },
  {
    countrySlug: "australia",
    cities: ["sydney", "melbourne", "brisbane", "perth", "adelaide", "canberra", "newcastle", "central-coast", "gold-coast", "sunshine-coast", "wollongong", "logan-city", "tasmania", "hobart", "launceston", "cairns", "townsville", "darwin", "ballarat", "bendigo", "geelong", "albury", "wodonga", "dubbo", "tamworth", "armidale", "newcastle", "gosford", "wyong", "wollongong", "goulburn", "canberra", "queanbeyan", "cooma", "yass", "bathurst", "orange", "parkes", "forbes", "cowra"],
  },
  {
    countrySlug: "singapore",
    cities: ["singapore", "marine-parade", "bukit-merah", "central-water-catchment", "clementi", "geylang", "kallang", "bishan", "toa-payoh", "novena", "tanglin", "bukit-timah", "west-coast", "clementi", "jurong-east", "jurong-west", "choa-chu-kang", "bukit-panjang", "yung-ho", "serangoon", "ang-mo-kio", "punggol", "sengkang", "hougang", "tampines", "pasir-ris", "bedok", "marine-parade", "east-coast", "outram", "central-area", "river-valley", "museum", "orchard", "newton", "sentosa", "changi", "brani", "loyang"],
  },
  {
    countrySlug: "japan",
    cities: ["tokyo", "yokohama", "osaka", "nagoya", "sapporo", "fukuoka", "kobe", "kyoto", "kawasaki", "saitama", "hiroshima", "yono", "omiya", "chiba", "setagaya", "nakano", "suginami", "shinjuku", "shibuya", "minato", "chuo", "chiyoda", "taito", "sumida", "koto", "edogawa", "bunkyo", "toshima", "kita", "arakawa"],
  },
];
