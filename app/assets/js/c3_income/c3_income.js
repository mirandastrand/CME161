// C3 init
var college_names = ['Holy Cross College', 'Barclay College', 'Northwest College-Beaverton', 'New York School of Interior Design', 'Southwest School of Business and Technical Careers-San Antonio', 'Corban University', 'Indian Capital Technology Center-Stilwell', 'Schuylkill Technology Center', 'Kaplan College-Corpus Christi', 'Marinello Schools of Beauty-San Francisco', 'ITT Technical Institute-San Dimas', 'De Wolff College Hair Styling and Cosmetology', 'Viterbo University', 'Everest College-LA Wilshire', 'Augsburg College', 'Culinary Institute of America', 'Broadview University-West Jordan', 'Paul Mitchell the School-Rhode Island', 'University of Dayton', 'Pennco Tech-Blackwood', 'Pennsylvania Academy of the Fine Arts', 'Meredith College', 'University of Maine at Machias', 'Saint Paul College', 'Instituto Tecnologico de Puerto Rico-Recinto de San Juan', 'El Camino Community College District', 'Samford University', 'University of Phoenix-San Diego Campus', 'Boston Architectural College', 'Earlham College', 'Pennsylvania State University-Penn State Shenango', 'Ohio Valley College of Technology', 'Albany Technical College', 'Kiamichi Technology Center-Talihina', 'Wheaton College', 'San Juan College', 'University of Mobile', 'Fort Myers Institute of Technology', 'Mandl School-The College of Allied Health', 'Ohio University-Chillicothe Campus', 'Houston Training School-Main Campus', 'Central Wyoming College', 'Spa Tech Institute-Ipswich', 'Lasell College', 'Compu-Med Vocational Careers Corp', 'Lewis University', 'Charter College-Canyon Country', 'Pitt Community College', 'Manhattan School of Music', 'Flathead Valley Community College', 'Northwest Christian University', 'Shasta College', 'King University', 'Rizzieri Aveda School for Beauty and Wellness', 'Kent State University at Ashtabula', 'Kiamichi Technology Center-Poteau', 'University of Massachusetts Medical School Worcester', 'Sierra College', 'Nebraska Christian College', 'Stephens College', 'Central Arizona College', 'Cleveland Institute of Art', 'Community Care College', 'University of Wisconsin-Whitewater', 'Brigham Young University-Idaho', 'William Peace University', 'Eckerd College', 'University of Arkansas Community College-Hope', 'Emmanuel College', 'Hispanic American College', 'Stevens-Henager College of Business-Provo', 'Carroll University', 'CET-Alexandria', 'Concorde Career College-Grand Prairie', 'Wichita Area Technical College', 'Le Cordon Bleu College of Culinary Arts-Orlando', 'La Baron Hairdressing Academy-Overland Park', 'Southeastern Beauty School-Columbus North Lumpkin', 'Heald College-Stockton', 'American Academy of Art', 'Nationwide Beauty Academy', 'Great Lakes Institute of Technology', 'Little Priest Tribal College', 'Kaplan Career Institute-Pittsburgh', 'University of California-Hastings College of Law', 'University of North Carolina at Greensboro', 'James Sprunt Community College', 'Montgomery County Community College', 'UEI College', 'Davenport University-Warren Location', 'Winthrop University', 'Heald College-San Francisco', 'Saint Anselm College', 'University of Phoenix-Savannah Campus', 'Roger Williams University', 'Kaplan College-Vista', 'Clovis Community College', 'CUNY Bernard M Baruch College', 'Grays Harbor College', 'Lincoln University of Pennsylvania', 'Washington State University-Tri Cities', 'Bidwell Training Center Inc', 'Lackawanna College', 'Wright Career College - Oklahoma City OK', 'Everest College-City of Industry', 'Concorde Career College-Memphis', 'Kankakee Community College', 'Tarleton State University', 'Everest Institute-Silver Spring', 'Apex Technical School', 'Delta Beauty College', 'North Dakota State College of Science', 'Brigham Young University-Provo', 'Texas Christian University', 'Middlesex County College', 'Baton Rouge School of Computers', 'Southern Careers Institute-Pharr', 'Oswego County BOCES', 'Tennessee Temple University', 'Everest College-Thornton', 'Hair Dynamics Education Center', 'Fayette County Career & Technical Institute Practical Nursing Program', 'Wesley College', 'Platt College-Lawton', 'Empire Beauty School-West Mifflin', "Buck's County School of Beauty Culture Inc", 'State University of New York at New Paltz', 'Phagans Grants Pass College of Beauty', 'Pratt Community College', 'Instituto Tecnologico de Puerto Rico-Recinto de Guayama', 'Tri-County Community College', 'Edgecombe Community College', 'Texas School of Business-Friendswood', 'University of North Dakota', 'Word of Life Bible Institute', 'Heald College-Rancho Cordova', 'Remington College-North Houston Campus', 'Academy of Massage Therapy', 'Southwestern Law School', 'Lehigh University', 'Fort Worth Beauty School', 'Chapman University', 'Lake Tahoe Community College', 'Goodwin College', 'Missouri Baptist University', 'West Georgia Technical College', 'The University of Texas at Arlington', 'Texas A & M University-Texarkana', 'Hair Academy Inc-New Carrollton', 'Bethel College-North Newton', 'Saint Norbert College', 'Saint Leo University', 'CET-Coachella', 'Stetson University', 'Moberly Area Community College', 'Saint Vincent Seminary', 'Citadel Military College of South Carolina', 'William Woods University', 'University of Cincinnati-Main Campus', 'CUNY Brooklyn College', 'Washington County Adult Skill Center', 'Lincoln Technical Institute-East Windsor', 'American Career College-Anaheim', 'Ottawa University-Ottawa', 'Everest College-Springfield', 'Institute for Business and Technology', 'Charleston School of Beauty Culture', 'Honolulu Community College', 'Hebrew Theological College', 'Iona College', 'Baldwin Beauty School-South Austin', 'University of Guam', 'Good Samaritan College of Nursing and Health Science', 'Morningside College', 'Scioto County Career Technical Center', 'Las Positas College', 'New York Institute of Technology', 'University of Michigan-Ann Arbor', 'Texas Barber Colleges and Hairstyling Schools', 'Concordia University-Chicago', 'PCI Health Training Center', 'Sonoma State University', 'Truckee Meadows Community College', 'Saint Catharine College', 'Centro de Estudios Multidisciplinarios-San Juan', 'Marinello Schools of Beauty-Sacramento', 'Southwestern Oregon Community College', 'Lincoln Technical Institute-Lowell', 'La James International College-East Moline', 'University of Arkansas-Fort Smith', 'Premiere Career College', 'University of Phoenix-Charlotte Campus', 'University of Phoenix-Dallas Campus', 'Wharton County Junior College', 'Ohio Dominican University', 'National Aviation Academy of Tampa Bay', 'All-State Career-Baltimore', 'Victory University', 'Jackson State Community College', 'Red River Technology Center', 'Herzing University-Birmingham', 'Rosedale Technical Institute', 'City College-Gainesville', 'Westminster College', 'University of Colorado Denver', 'Sanford-Brown College-St Peters', 'Northland Pioneer College', 'Arkansas Tech University', 'Southern Crescent Technical College', 'Northwest Technology Center-Alva', 'Hawaii Institute of Hair Design', 'Delaware County Community College', 'Point Park University', 'Razzle Dazzle College of Hair Design Inc', 'Chattahoochee Technical College', 'Muhlenberg Harold B and Dorothy A Snyder Schools-School of Nursing', 'Quinebaug Valley Community College', 'Prairie State College', 'Everest College-Merrillville', 'The University of Tennessee-Chattanooga', 'Southern New Hampshire University', 'Medina County Career Center', 'Briar Cliff University', 'Northwestern Michigan College', 'Career Technology Center of Lackawanna County', 'Tennessee College of Applied Technology-McMinnville', 'Delta Technical College', 'Centura College-Newport News', 'Kaplan College-Hammond', 'Anthem Institute-Las Vegas', 'University of Nebraska at Omaha', 'University of Maryland-College Park', 'La James International College-Cedar Falls', 'Irvine Valley College', 'Jefferson Davis Community College', 'Brookline College-Tucson', 'Stanly Community College', 'Rutgers University-New Brunswick', 'Austin College', 'Fortis College-Smyrna', 'The Community College of Baltimore County', 'Embry-Riddle Aeronautical University-Daytona Beach', 'Hendrix College', 'Harris School of Business-Cherry Hill Campus', 'Metropolitan Community College Area', 'Copiah-Lincoln Community College', 'Laurel University', 'The Art Institute of Seattle', 'Columbia Centro Universitario-Caguas', 'South Hills School of Business & Technology', 'International Beauty College', 'Pima Medical Institute-Chula Vista', 'South Texas College', 'Highline Community College', 'Maryville College', 'Berklee College of Music', 'Academy of Hair Technology', 'Cerro Coso Community College', 'Clark State Community College', 'International Salon and Spa Academy', 'Southeastern Community College', 'Pennsylvania State University-Penn State Altoona', 'South Baylo University', 'Inter American University of Puerto Rico-Fajardo', 'University of Charleston', 'The College of New Rochelle', 'Paul Mitchell the School-Costa Mesa', 'Sunstate Academy', 'ITT Technical Institute-Cordova', 'Pacific Union College', 'Bryant & Stratton College-Syracuse', 'Kaplan College-El Paso', 'Jacksonville College-Main Campus', 'Lincoln Technical Institute-Hartford', 'Bainbridge State College', 'Solano Community College', 'Ogle School Hair Skin Nails-Ft Worth', 'La Belle Beauty School', 'Wayne State College', 'West Virginia School of Osteopathic Medicine', 'Bryan College of Health Sciences', 'Virginia School of Massage', 'Westech College', 'Fashion Institute of Technology', 'Edinboro University of Pennsylvania', 'Vanderbilt University', 'Columbia Centro Universitario-Yauco', 'The International Culinary Center', 'Globelle Technical Institute', 'Heald College-Honolulu', 'Universidad Adventista de las Antillas', 'Northern Marianas College', 'EHOVE Career Center', 'Pennsylvania State University-Penn State Brandywine', 'South Dakota State University', 'Hair Professionals Academy of Cosmetology', 'InterCoast Colleges-Orange', 'Brown Mackie College-Hopkinsville', 'Arkansas State University-Newport', 'East-West University']

var top_college_names = ['Pomona College', 'Yale University', 'University of Notre Dame', 'Amherst College', 'Harvard University', 'Massachusetts Institute of Technology', 'Williams College', 'Dartmouth College', 'Princeton University', 'Columbia University in the City of New York', 'University of Pennsylvania', 'Swarthmore College', 'Brown University', 'Stanford University']

var my_data = [
  ["Mean Graduate Income", 43500, 30400, 20000, 44700, 20800, 40200, 27400, 32500, 26000, 33100, 42300, 19400, 44400, 25700, 49700, 43900, 31200, 23600, 58500, 38300, 24700, 41900, 28800, 34100, 23900, 34800, 57900, 60500, 44900, 39000, 53500, 20900, 25500, 25300, 50500, 36700, 40900, 30000, 31000, 43900, 20400, 34600, 26200, 42200, 18900, 52400, 27400, 29500, 37400, 28700, 43300, 30500, 47100, 26300, 40000, 25300, 191400, 35000, 29300, 35600, 31200, 40800, 23700, 44300, 45600, 39400, 45900, 27100, 46600, 22000, 36000, 46600, 24000, 48700, 30000, 31100, 24500, 17100, 32500, 30500, 22300, 22300, 22000, 28300, 122900, 40600, 26300, 38600, 27500, 34100, 38500, 42000, 58100, 60500, 51000, 35000, 30000, 59200, 30700, 35500, 52200, 22000, 33700, 20500, 29800, 24400, 30500, 44900, 25700, 38800, 18600, 46200, 66700, 58300, 40400, 32400, 22100, 31400, 36700, 28400, 24100, 32600, 45000, 23200, 20900, 27500, 47700, 17300, 35500, 23900, 24500, 26000, 24700, 56500, 30600, 37600, 30200, 31600, 79500, 85800, 21200, 52700, 34000, 27100, 36100, 30700, 50900, 38700, 23400, 39000, 49100, 48900, 24000, 47000, 30800, 49500, 55100, 38400, 46000, 49900, 24900, 38300, 31900, 44900, 27000, 38100, 19700, 35000, 28600, 56600, 25900, 33200, 44200, 38300, 28900, 38000, 56000, 72000, 21400, 43200, 25100, 49900, 37200, 34600, 19700, 20300, 32600, 33600, 17000, 33100, 31800, 60500, 60500, 39400, 42600, 50600, 33900, 43200, 28900, 24000, 44100, 35300, 29600, 48900, 93200, 32800, 27000, 38200, 28000, 24000, 19100, 39700, 42500, 17900, 31200, 68300, 30800, 30800, 24400, 41500, 46100, 24400, 43300, 33300, 34700, 26100, 33900, 27100, 27400, 28700, 46500, 66600, 20200, 42200, 30900, 24100, 29700, 62000, 54400, 28000, 37400, 65500, 44500, 29600, 31200, 31200, 35800, 37900, 24400, 31100, 21100, 29200, 34700, 39300, 41200, 37500, 18700, 30900, 30300, 18600, 29100, 53500, 32200, 23500, 43800, 40200, 23600, 22300, 42300, 54600, 24100, 25900, 28400, 33200, 26900, 40400, 23800, 16800, 39000, 227000, 52200, 25200, 28500, 48900, 36700, 77000, 24400, 49600, 18000, 42000, 27300, 21900, 32300, 53500, 46100, 21100, 26300, 29100, 36400, 26500],
  ["Average Family Income", 101558.45, 55592.03, 42191.75, 84043.96, 13644.02, 69572.67, 15769.65, 42299.79, 16971.15, 26703.39, 40111.12, 23560.91, 64999.51, 14556.0, 74730.25, 78999.04, 37801.01, 50408.99, 122480.57, 38338.06, 64578.27, 75153.97, 41604.11, 28365.73, 16509.19, 18790.79, 92968.08, 47023.93, 61460.45, 94178.23, 81964.64, 23087.91, 14671.53, 14773.61, 99677.32, 26867.67, 51471.07, 20166.54, 14314.47, 73621.04, 13269.85, 30784.23, 45488.41, 86819.79, 6078.55, 78739.55, 24085.78, 26968.35, 74375.88, 26254.7, 57021.76, 19771.75, 59579.65, 64283.4, 61046.44, 14773.61, 18470.15, 21712.73, 56136.35, 72751.34, 27253.57, 81372.39, 19852.54, 76990.02, 48558.75, 72972.81, 88787.07, 23109.77, 91299.92, 9422.1, 31209.92, 80731.12, 17218.54, 28499.02, 32529.88, 47819.38, 34825.56, 11889.69, 29814.52, 77768.98, 61836.94, 28810.02, 13533.8, 18314.56, 21103.51, 62041.39, 21216.06, 47093.14, 20674.88, 35405.77, 67902.81, 36363.01, 115142.41, 47023.93, 115567.69, 32858.72, 21902.85, 29059.07, 23399.21, 44650.53, 70810.85, 17407.37, 45050.23, 11863.04, 25081.31, 18800.55, 24580.03, 54294.39, 22290.69, 20297.51, 10832.18, 57445.07, 42156.62, 103263.14, 37120.97, 26534.35, 14975.55, 34623.82, 59482.33, 23815.73, 52430.64, 29795.57, 75952.19, 18385.19, 32253.91, 53212.71, 73261.15, 20773.13, 45522.19, 16509.19, 21434.93, 20112.06, 19021.52, 78359.31, 58150.53, 32126.24, 18065.27, 40068.12, 19468.03, 125770.36, 16254.79, 71813.4, 16648.69, 35771.79, 60271.01, 22458.56, 51136.11, 33499.45, 21332.9, 69847.54, 104626.75, 49157.22, 17218.54, 83620.71, 35373.22, 87118.24, 94258.6, 69085.18, 64379.94, 27433.12, 18312.11, 59535.84, 24657.68, 55721.97, 24511.58, 27562.46, 17095.52, 25041.49, 47801.79, 94283.08, 15154.05, 33353.99, 60446.33, 68803.77, 20501.21, 19901.87, 56926.77, 87306.5, 15801.08, 69992.09, 21089.6, 64411.44, 28901.96, 48989.06, 7716.9, 32547.44, 32091.32, 25446.91, 32015.45, 34268.8, 26534.39, 47023.93, 47023.93, 38375.53, 62680.61, 33082.85, 21365.82, 41191.94, 22686.67, 15173.88, 27630.62, 27867.28, 25835.11, 77986.69, 51853.53, 26003.74, 19027.83, 42912.59, 20546.99, 19190.15, 17362.33, 42301.82, 59212.25, 24534.82, 21914.97, 60843.23, 22884.7, 22180.1, 27597.13, 56874.59, 70725.24, 19201.33, 66034.18, 40329.97, 33473.31, 21270.58, 24279.24, 18835.29, 25476.09, 28644.37, 67569.73, 91124.17, 45011.01, 23295.64, 18580.6, 14933.38, 22528.08, 76131.15, 96751.26, 25740.57, 29424.27, 71628.0, 100605.48, 25076.31, 27788.32, 24948.04, 49661.57, 59971.93, 12821.33, 39555.28, 14657.1, 30371.87, 18951.18, 26653.56, 70519.43, 94505.71, 41096.13, 15251.73, 30406.54, 32056.01, 32508.46, 81964.64, 20000.12, 17971.97, 64873.01, 25320.42, 50408.99, 25013.83, 35840.05, 79730.12, 24120.35, 17812.88, 23232.74, 57223.79, 19504.4, 22022.96, 39831.94, 8964.72, 61864.66, 22469.45, 54096.53, 29484.2, 13500.15, 69768.51, 58219.63, 99004.36, 12821.33, 47764.86, 6342.8, 36363.01, 20654.97, 20380.38, 36820.44, 81964.64, 68399.37, 48889.14, 16667.0, 23454.05, 38618.99, 22090.03],
  ["Mean Graduate Income (top)", 67600, 95300, 88000, 88400, 130500, 128400, 83200, 99700, 113000, 99600, 113400, 67900, 81400, 123400],
  ["Average Family Income (top)", 96962.74, 73769.14, 123618.48, 107166.93, 60645.79, 95848.89, 106459.04, 102621.61, 89090.02, 59265.49, 87200.75, 104516.71, 103616.9, 83177.59]
];

var x_table = {
  "Mean Graduate Income": "Average Family Income",
  "Mean Graduate Income (top)": "Average Family Income (top)"
}

var my_chart_parameters = {
  "data": {
    "xs": x_table,
    "columns": my_data,
    "selection": {
      "enabled": true
    },
    "type": "scatter"
  },
  "legend": {
    "show": false
  },
  "point": {
    "r": 6,
    "focus": {
      "expand": {
        "r": 8,
        "enabled": true
      }
    }
  },
  "tooltip": {
    "format": {
      "title": function(value) {
        if (my_data[1].indexOf(value) == -1) {
          var index = my_data[3].indexOf(value);
          return top_college_names[index - 1];
        } else {
          var index = my_data[1].indexOf(value);
          return college_names[index - 1];
        }
      },
      "value": function(value, ratio, id) {
        var format = d3.format('$');
        return format(value);
      }
    }
  },
  "axis": {
    "x": {
      "label": {
        "text": "Average Family Income of Students",
        "position": "outer-center"
      },
      "tick": {
        "values": [25000, 50000, 75000, 100000, 125000],
        "fit": true
      }
    },
    "y": {
      "label": {
        "text": "Mean Graduate Income 10 Years After Graduation",
        "position": "outer-middle"
      }
    }
  }
};

var my_chart_object = c3.generate(my_chart_parameters);

// slides

var slide_0 = function() {
  my_chart_object.hide("Mean Graduate Income (top)")
  document.getElementById("message").innerHTML = "This plot compares the average family income of students at US colleges to the mean incomes of graduates of those same colleges, 10 years after they graduate. Each point represents an individual college. The particular 400 colleges on the plot were selected randomly from those in the College Scorecard Dataset, and make up roughly 10% of the total number of colleges for which this data is available.* <br> <sub>*I chose to show only a sampling of colleges to avoid including a massive amount of data in the Javascript file.</sub>";
};

var slide_1 = function() {
  document.getElementById("message").innerHTML = "The relationship between family income and graduates' income appears mostly linear, with higher family incomes corresponding to higher graduate incomes. However, there are some notable outliers. The most dramatic are colleges specializing in medicine.";
  setTimeout(function() {
    my_chart_object.select(["Mean Graduate Income"], [44, 84]);
  }, 500);
};

var slide_2 = function() {
  my_chart_object.unselect();
  setTimeout(function() {
    my_chart_object.select(["Mean Graduate Income"], [54, 70]);
  }, 500);
  document.getElementById("message").innerHTML = "Other outliers with high graduate income compared to students' family income are colleges of law.";
}

var slide_3 = function() {
  setTimeout(function() {
    my_chart_object.show("Mean Graduate Income (top)");
  }, 500);
  my_chart_object.unselect();
  document.getElementById("message").innerHTML = "The points added in orange are the 2015 Forbes top colleges in America (excluding the United States Military Academy, for which data was not available).";
};

var slide_4 = function() {
  setTimeout(function() {
    my_chart_object.select(["Mean Graduate Income (top)"], [3]);
  }, 500);
  document.getElementById("message").innerHTML = "For context, here's Stanford!";
};

var slide_5 = function() {
  setTimeout(function() {
    my_chart_object.focus("Mean Graduate Income (top)");
    my_chart_object.ygrids.add([{
      value: 40014,
      text: "Mean of Graduate Incomes"
    }]);
  }, 500);
  my_chart_object.unselect();
  document.getElementById("message").innerHTML = "Graduates of these \"top colleges\" have mean incomes on the higher end.";
};

var slide_6 = function() {
  setTimeout(function() {
    my_chart_object.xgrids.add([{
      value: 44357.46,
      text: "Mean of Family Incomes",
    }]);
  }, 500);
  document.getElementById("message").innerHTML = "But it is also noteworthy that the mean family incomes of students at these schools are also relatively high.";
};

var slide_7 = function() {
  my_chart_object.revert();
  setTimeout(function() {
    my_chart_object.xgrids.remove();
    my_chart_object.ygrids.remove();
  }, 250);
  document.getElementById("message").innerHTML = "";
};


var slides = [slide_0, slide_1, slide_2, slide_3, slide_4, slide_5, slide_6, slide_7];

// cycle through slides

var current_slide = 0;

var run = function() {
  slides[current_slide]();
  current_slide += 1;

  if (current_slide === slides.length) {
    current_slide = 0;
    document.getElementById("start_btn").innerHTML = "Replay";
  } else {
    document.getElementById("start_btn").innerHTML = "Next";
  }
};

// button event handler

document.getElementById('start_btn').addEventListener("click", run);

// init

run();
