const largeurMini = 50;
const longueuMini = 50;
const largeurMax = 2000;
const longueuMax = 2000;
const pourcentageVitesse = 85;
const pourcentagePdc = 50;
const nbSolutionMax = 25;
const tableauVide = "Aucune solution trouvée";

const debug = false;

if (debug)
{
	recuperationInformation();
}

function recuperationInformation()
{
	var _debit = 1000;
	var _vitesseMax = 5;
	var _pdcMax = 0.1;

	var _largeur = 100;
	var _hauteur = 100;
	var resultat = new Array();

	if (document.getElementById("erreur_tableau_vide"))
		document.getElementById("erreur_tableau_vide").remove();
	if (document.getElementById("tableauUnique"))
		document.getElementById("tableauUnique").remove();

	if (!debug)
	{
		_debit = parseFloat(document.getElementById("debitGaineRectangulaire").value);
		_vitesseMax = parseFloat(document.getElementById("vitesseMaxGaineRectangulaire").value);
		_pdcMax = parseFloat(document.getElementById("pdcMaxGaineRectangulaire").value);
		_largeur = parseFloat(document.getElementById("largeurGaineRectangulaire").value);
		_hauteur = parseFloat(document.getElementById("hauteurGaineRectangulaire").value);
	}

	save();

	if (document.getElementById("radioBruit_id").checked)
  {
    	if (_debit != "" && _debit>0 && (document.getElementById("iso30_id").checked || (document.getElementById("iso40_id").checked)
    		|| (document.getElementById("isoIndus_id").checked) || (document.getElementById("isoIndusPlus_id").checked)))
    	{
    		resultat = calcul(_debit, _vitesseMax);
    		if (debug)
					console.log(resultat.length);
				else
				{
					if (resultat.length == 0)
					{
						if (document.getElementById("tableauUnique"))
							document.getElementById("tableauUnique").remove();

						if (!document.getElementById("erreur_tableau_vide"))
						{
							var div = document.createElement('DIV');
							var body = document.getElementsByTagName("body")[0];
							div.id = "erreur_tableau_vide";
							div.innerHTML = tableauVide;
							body.appendChild(div);
						}
					}
					else
					{
						if (document.getElementById("erreur_tableau_vide"))
			    	    	document.getElementById("erreur_tableau_vide").remove();
						resultat.sort(function (a, b) {return b[2]-a[2];});
						generate_table(resultat, "tableauUnique", ["PDC [daPa/m]", "Bruit [dBA]", "Classe bruit", "Vitesse [m/s]", "Largeur [mm]", "Hauteur [mm]"]);
					}
				}
    	}
			else if (document.getElementById("erreur_tableau_vide"))
				document.getElementById("erreur_tableau_vide").remove();
    }
    else if (document.getElementById("radioVitesseMax_id").checked)
    {
    	if (_debit != "" && _vitesseMax != "" && _debit>0 && _vitesseMax>0)
    	{
    		resultat = calcul(_debit, _vitesseMax);
    		if (debug)
					console.log(resultat.length);
			else
			{
				if (resultat.length == 0)
				{
					if (document.getElementById("tableauUnique"))
						document.getElementById("tableauUnique").remove();

					if (!document.getElementById("erreur_tableau_vide"))
					{
						var div = document.createElement('DIV');
						var body = document.getElementsByTagName("body")[0];
						div.id = "erreur_tableau_vide";
						div.innerHTML = tableauVide;
						body.appendChild(div);
					}
				}
				else
				{
					if (document.getElementById("erreur_tableau_vide"))
		    	    	document.getElementById("erreur_tableau_vide").remove();
					resultat.sort(function (a, b) {return b[2]-a[2];});
					generate_table(resultat, "tableauUnique", ["PDC [daPa/m]", "Bruit [dBA]", "Classe bruit", "Vitesse [m/s]", "Largeur [mm]", "Hauteur [mm]"]);
				}
			}
    	}
		else if (document.getElementById("erreur_tableau_vide"))
		    document.getElementById("erreur_tableau_vide").remove();
  }
	else if (document.getElementById("radioPdcMax_id").checked)
  {
    	if (_debit != "" && _pdcMax != "" && _debit>0 && _pdcMax>0)
    	{
    		resultat = calculPdcMax(_debit, _pdcMax);
    		if (debug)
					console.log(resultat.length);
				else
				{
					if (resultat.length == 0)
					{
						if (document.getElementById("tableauUnique"))
							document.getElementById("tableauUnique").remove();

						if (!document.getElementById("erreur_tableau_vide"))
						{
							var div = document.createElement('DIV');
							var body = document.getElementsByTagName("body")[0];
							div.id = "erreur_tableau_vide";
							div.innerHTML = tableauVide;
							body.appendChild(div);
						}
					}
					else
					{
						if (document.getElementById("erreur_tableau_vide"))
			    	    	document.getElementById("erreur_tableau_vide").remove();
						resultat.sort(function (a, b) {return b[2]-a[2];});
						generate_table(resultat, "tableauUnique", ["PDC [daPa/m]", "Bruit [dBA]", "Classe bruit", "Vitesse [m/s]", "Largeur [mm]", "Hauteur [mm]"]);
					}
				}
    	}
			else if (document.getElementById("erreur_tableau_vide"))
			    document.getElementById("erreur_tableau_vide").remove();
    }
    else if (document.getElementById("radioVitesseMaxBruit_id").checked)
    {
    	if (_debit != "" && _debit>0 && _vitesseMax != "" && (document.getElementById("iso30_id").checked || (document.getElementById("iso40_id").checked)
    		|| (document.getElementById("isoIndus_id").checked) || (document.getElementById("isoIndusPlus_id").checked)))
    	{
    		resultat = calcul(_debit, _vitesseMax);
    		if (debug)
					console.log(resultat.length);
			else
			{
				if (resultat.length == 0)
				{
					if (document.getElementById("tableauUnique"))
						document.getElementById("tableauUnique").remove();

					if (!document.getElementById("erreur_tableau_vide"))
					{
						var div = document.createElement('DIV');
						var body = document.getElementsByTagName("body")[0];
						div.id = "erreur_tableau_vide";
						div.innerHTML = tableauVide;
						body.appendChild(div);
					}
				}
				else
				{
					if (document.getElementById("erreur_tableau_vide"))
		    	    	document.getElementById("erreur_tableau_vide").remove();
					resultat.sort(function (a, b) {return b[2]-a[2];});
					generate_table(resultat, "tableauUnique", ["PDC [daPa/m]", "Bruit [dBA]", "Classe bruit", "Vitesse [m/s]", "Largeur [mm]", "Hauteur [mm]"]);
				}
			}
    	}
		else if (document.getElementById("erreur_tableau_vide"))
			document.getElementById("erreur_tableau_vide").remove();
    }

		if (document.getElementById("radioDimension_id").checked)
	  {
			if (_debit != "" && _debit>0 && _largeur != "" && _largeur>0 && _hauteur != "" && _hauteur>0)
			{
				generate_table(	calculDimension(_debit, _largeur, _hauteur) , "tableauUnique", ["PDC [daPa/m]", "Bruit [dBA]", "Classe bruit", "Vitesse [m/s]", "Largeur [mm]", "Hauteur [mm]"]);
			}
			else if (document.getElementById("erreur_tableau_vide"))
				document.getElementById("erreur_tableau_vide").remove();
		}
}

function creationEnTete(table, listeNom)
{
	var header = table.createTHead();
  	var row = header.insertRow(0);
	for (i=0;i<listeNom.length;i++)
	{
  		var cell = row.insertCell(0);
  		cell.innerHTML = "<b>"+listeNom[i]+"</b>";
	}
}

function generate_table(tableau, id_newArray, listeEnTete)
{
	// get the reference for the body
    var body = document.getElementById("colonne_2");

    // creates a <table> element and a <tbody> element
    if (document.getElementById(id_newArray))
    	document.getElementById(id_newArray).remove();
    var tbl = document.createElement("table");
    tbl.id = id_newArray;
    tbl.setAttribute('class', id_newArray);
    var tblBody = document.createElement("tbody");
    creationEnTete(tbl, listeEnTete);

    // creating all cells
    for (var i = 0; i < tableau.length; i++)
    {
      // creates a table row
    	var row = document.createElement("tr");

    	for (var j = 0; j < listeEnTete.length; j++)
    	{
    		// Create a <td> element and a text node, make the text
      		// node the contents of the <td>, and put the <td> at
      		// the end of the table row
      		var cell = document.createElement("td");
      		var cellText = document.createTextNode(tableau[i][j]);
      		cell.appendChild(cellText);
      		row.appendChild(cell);
    	}
 	    // add the row to the end of the table body
    	tblBody.appendChild(row);
  	}

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tbl);
}

function compare(a, b) {
  if (a<b)
     return -1;
  if (a==b)
     return 1;
  return 0;
}

function checkNumber(x)
{
	if (isNaN(x))
		return false;
	else
		return true;
}
function calculVitesse(Q, largeur, hauteur)
{
	var vitesse = 0.0;
	vitesse = Q/(3600*hauteur*largeur/(1000*1000));
  vitesse = Math.round(vitesse*100)/100;
  return vitesse;
}

function d_t(largeur1, hauteur1)
{
	var diametre;
	diametre = 2*hauteur1*largeur1/(largeur1 + hauteur1);
	return diametre;
}

function masse_volumique_air()
{
	return 1.19;
}

function calculPdc(vitesse, largeur, hauteur)
{
	var dt = 0.0;
	var pdc = 0.0;
	dt = d_t(largeur,hauteur);
  pdc = 0.981*5*masse_volumique_air()*Math.pow(vitesse,1.82)/(Math.pow(dt,1.22));
  return pdc;
}

function calcul_D_equivalent(Q, V, largeur, hauteur)
{
	var pdc = calculPdc(V, largeur, hauteur);
  var x = 1000000*(Q/(900*Math.PI));
  var y = (0.981*6/pdc)*Math.pow(x,1.82);
  var d_equivalent = Math.pow(y,1/4.86);
  return d_equivalent;
}

function calculBruit(D, v)
{
	var ns = "> à iso indus";

  if ((D <= 170) && (v <= 4.3))
      ns = "iso indus";
  if ((D > 170) && (D <= 360) && (v <= (8.29 * Math.log10(D) - 14.18)))
  	ns = "iso indus";
  if (((D > 360) && (D <= 710)) && (v <= (13.56 * Math.log10(D) - 27.67)))
  	ns = "iso indus";
  if ((D > 710) && (v <= (13.17 * Math.log10(D) - 26.75)))
  	ns = "iso indus";
  if ((D <= 180) && (v <= 3.6))
  	ns = "iso 40";
  if (((D > 180) && (D <= 405)) && (v <= (6.82 * Math.log10(D) - 11.81)))
      ns = "iso 40";
  if (((D > 405) && (D <= 760)) && (v <= (10.98 * Math.log10(D) - 22.62)))
  	ns = "iso 40";
  if ((D > 760) && (v <= (9.67 * Math.log10(D) - 18.85)))
      ns = "iso 40";
  if ((D <= 165) && (v <= 3))
      ns = "iso 30";
  if (((D > 165) && (D <= 400)) && (v <= (5.2 * Math.log10(D) - 8.53)))
      ns = "iso 30";
  if (((D > 400) && (D <= 710)) && (v <= (8.03 * Math.log10(D) - 15.88)))
      ns = "iso 30";
  if ((D > 710) && (v <= (6.86 * Math.log10(D) - 12.56)))
      ns = "iso 30";

  return ns;
}

function calculBruitNR(Q, v)
{
	var S = (Q / 3600) / v;
	if (Q * v == 0)
         ns_r = 0;

    if (Q * v > 0)
    {
        pr = 10 + 50 * Math.log10(v) + 10 * Math.log10(S);
        P1 = (pr - 5 - 26)/10;
        P2 = (pr - 7 - 15.5)/10;
        P3 = (pr - 10 - 8)/10;
        P4 = (pr - 12 - 3)/10;
        P5 = (pr - 14)/10;
        P6 = (pr - 16 + 1.5)/10;
        P7 = (pr - 18 + 1.5)/10;
        P8 = (pr - 20)/10;
        ns_r = 10 * Math.log10(Math.pow(10,P1) + Math.pow(10,P2) + Math.pow(10,P3) + Math.pow(10,P4) + Math.pow(10,P5) + Math.pow(10,P6) + Math.pow(10,P7) + Math.pow(10,P8)) - 4;
    }

    ns_r = Math.round(ns_r*10)/10;

    return ns_r.toFixed(1);
}

/* calcul les largeurs et largeurs adaptées à la PDC */
function calculPdcMax(Q, PDCmax)
{
	var i = largeurMini;
	var j = longueuMini;
	var tableau = [];

	for (i=largeurMini ; i<= largeurMax ; i=i+50)
	{
		for (j=longueuMini ; j<= longueuMax ; j=j+50)
		{
			var vitesseIJ = calculVitesse(Q, i, j);
			var D_equiv = calcul_D_equivalent(Q, vitesseIJ, i, j);
			var pdcIJ = Math.round(calculPdc(vitesseIJ, i, j)*100)/100;
			var D = (((Q/3600)/Math.PI)/(Math.pow(D_equiv/1000,2)))*4;
      var bruit = calculBruit(D_equiv,D);
      var bruitNR = calculBruitNR(Q, vitesseIJ);

      var x = 0;
      if ((i<(j*2)) && (j<(i*2)) && (i>=j))
      {
      	// Si dimensionnement par 'PDC max' ###
      	if (document.getElementById("radioPdcMax_id").checked
      		&& (pdcIJ <= PDCmax)
      		&& (pdcIJ >= (PDCmax*(pourcentagePdc/100))))
      	{
      		tableau[tableau.length] = ([i, j, vitesseIJ,bruit, bruitNR, pdcIJ]);
      	}
      }
		}
		if (tableau.length > nbSolutionMax)
			return tableau;
	}
	return tableau;
}

/* calcul la vitesse et la pdc adaptées aux dimensions */
function calculDimension(debit, largeur, hauteur)
{
	var tableau = [];

	var x = [-150, -100, -50, 0, +50, +100, +150];

	for (var i = 0; i < x.length; i++) {
		if (largeur+x[i]>100 && hauteur+x[i]>100) {
			var vitesseIJ = calculVitesse(debit, largeur+x[i], hauteur+x[i]);
			var D_equiv = calcul_D_equivalent(debit, vitesseIJ, largeur+x[i], hauteur+x[i]);
			var pdcIJ = Math.round(calculPdc(vitesseIJ, largeur+x[i], hauteur+x[i])*100)/100;
			var D = (((debit/3600)/Math.PI)/(Math.pow(D_equiv/1000,2)))*4;
			var bruit = calculBruit(D_equiv,D);
			var bruitNR = calculBruitNR(debit, vitesseIJ);

			tableau[tableau.length] = ([hauteur+x[i], largeur+x[i], vitesseIJ,bruit, bruitNR, pdcIJ]);
		}
	}
	return tableau
}


/* calcul les largeurs et largeurs adaptées à la vitesse */
function calcul(Q, Vmax)
{
	var i = largeurMini;
	var j = longueuMini;
	var tableau = [];

	for (i=largeurMini ; i<= largeurMax ; i=i+50)
	{
		for (j=longueuMini ; j<= longueuMax ; j=j+50)
		{
			var vitesseIJ = calculVitesse(Q, i, j);
			var D_equiv = calcul_D_equivalent(Q, vitesseIJ, i, j);
			var pdcIJ = Math.round(calculPdc(vitesseIJ, i, j)*100)/100;
			var D = (((Q/3600)/Math.PI)/(Math.pow(D_equiv/1000,2)))*4;
      var bruit = calculBruit(D_equiv,D);
      var bruitNR = calculBruitNR(Q, vitesseIJ);
      var liste_bruit = new Array();

      if (document.getElementById("iso30_id").checked)
      	liste_bruit.push('iso 30');
      if (document.getElementById("iso40_id").checked)
        liste_bruit.push('iso 40');
      if (document.getElementById("isoIndus_id").checked)
      	liste_bruit.push('iso indus');
      if (document.getElementById("isoIndusPlus_id").checked)
      	liste_bruit.push('> à iso indus');

      var x = 0;
      if ((i<(j*2)) && (j<(i*2)) && (i>=j))
      {
      	// Si dimensionnement par 'vitesse max' ###
      	if (document.getElementById("radioVitesseMax_id").checked
      		&& (vitesseIJ <= Vmax)
      		&& (vitesseIJ >= (Vmax*(pourcentageVitesse/100))))
      	{
      		tableau[tableau.length] = ([i, j, vitesseIJ,bruit, bruitNR, pdcIJ]);
      	}

      	if (document.getElementById("radioBruit_id").checked)
      	{
      		for (x=0; x<liste_bruit.length; x++)
        		if (bruit == liste_bruit[x] && (vitesseIJ <= 20))
        			tableau[tableau.length] = ([i, j, vitesseIJ,bruit, bruitNR, pdcIJ]);
      	}

      	if (document.getElementById("radioVitesseMaxBruit_id").checked
      		&& (vitesseIJ <= Vmax)
      		&& (vitesseIJ >= (Vmax*(pourcentageVitesse/100))))
      	{
					for (x=0; x<liste_bruit.length; x++)
        		if (bruit == liste_bruit[x] && (vitesseIJ <= 20))
        			tableau[tableau.length] = ([i, j, vitesseIJ,bruit, bruitNR, pdcIJ]);
        }
      }
		}
		if (tableau.length > nbSolutionMax)
			return tableau;
	}
	return tableau;
}

function radioclick (b)
{
	if (b==1)
	{
		document.getElementById('checkboxDiv').style.display = 'none';

		document.getElementById('vitesseMaxGaineRectangulaireContainer').style.display = 'flex';

		document.getElementById('pdcMaxGaineRectangulaireContainer').style.display = 'none';

		document.getElementById('largeurGaineRectangulaireContainer').style.display = 'none';

		document.getElementById('hauteurGaineRectangulaireContainer').style.display = 'none';

		recuperationInformation();
	}
	else if (b==2)
	{
		document.getElementById('vitesseMaxGaineRectangulaireContainer').style.display = 'none';

		document.getElementById('pdcMaxGaineRectangulaireContainer').style.display = 'none';

		document.getElementById('largeurGaineRectangulaireContainer').style.display = 'none';

		document.getElementById('hauteurGaineRectangulaireContainer').style.display = 'none';

		document.getElementById('checkboxDiv').style.display = 'block';

		recuperationInformation();
	}
	else if (b==3)
	{
		document.getElementById('vitesseMaxGaineRectangulaireContainer').style.display = 'none';

		document.getElementById('pdcMaxGaineRectangulaireContainer').style.display = 'flex';

		document.getElementById('largeurGaineRectangulaireContainer').style.display = 'none';

		document.getElementById('hauteurGaineRectangulaireContainer').style.display = 'none';

		document.getElementById('checkboxDiv').style.display = 'none';

		recuperationInformation();
	}
	else if (b==4)
	{
		document.getElementById('vitesseMaxGaineRectangulaireContainer').style.display = 'flex';

		document.getElementById('pdcMaxGaineRectangulaireContainer').style.display = 'none';

		document.getElementById('checkboxDiv').style.display = 'block';

		document.getElementById('largeurGaineRectangulaireContainer').style.display = 'none';

		document.getElementById('hauteurGaineRectangulaireContainer').style.display = 'none';

		recuperationInformation();
	}
	else if (b==5)
	{
		document.getElementById('vitesseMaxGaineRectangulaireContainer').style.display = 'none';

		document.getElementById('pdcMaxGaineRectangulaireContainer').style.display = 'none';

		document.getElementById('checkboxDiv').style.display = 'none';

		document.getElementById('largeurGaineRectangulaireContainer').style.display = 'flex';

		document.getElementById('hauteurGaineRectangulaireContainer').style.display = 'flex';

		recuperationInformation();
	}
}

function save()
{
		var checkbox = document.getElementById("iso30_id");
		localStorage.setItem("iso30_id", checkbox.checked);
		var checkbox = document.getElementById("iso40_id");
		localStorage.setItem("iso40_id", checkbox.checked);
		var checkbox = document.getElementById("isoIndus_id");
		localStorage.setItem("isoIndus_id", checkbox.checked);
		var checkbox = document.getElementById("isoIndusPlus_id");
		localStorage.setItem("isoIndusPlus_id", checkbox.checked);

		localStorage.setItem('debitGaineRectangulaire', document.getElementById("debitGaineRectangulaire").value);
		localStorage.setItem('vitesseMaxGaineRectangulaire', document.getElementById("vitesseMaxGaineRectangulaire").value);
		localStorage.setItem('pdcMaxGaineRectangulaire', document.getElementById("pdcMaxGaineRectangulaire").value);
		localStorage.setItem('largeurGaineRectangulaire', document.getElementById("largeurGaineRectangulaire").value);
		localStorage.setItem('hauteurGaineRectangulaire', document.getElementById("hauteurGaineRectangulaire").value);

		var allElems = document.getElementsByTagName('input');
		for (i = 0; i < allElems.length; i++) {
		    if (allElems[i].type == 'radio' && allElems[i].checked) {
		        localStorage.setItem('typeCalcul', allElems[i].value);
		    }
		}
}

function load()
{
		var checked = JSON.parse(localStorage.getItem("iso30_id"));
		document.getElementById("iso30_id").checked = checked;
		var checked = JSON.parse(localStorage.getItem("iso40_id"));
		document.getElementById("iso40_id").checked = checked;
		var checked = JSON.parse(localStorage.getItem("isoIndus_id"));
		document.getElementById("isoIndus_id").checked = checked;
		var checked = JSON.parse(localStorage.getItem("isoIndusPlus_id"));
		document.getElementById("isoIndusPlus_id").checked = checked;

		if(localStorage.hasOwnProperty("debitGaineRectangulaire"))
			document.getElementById("debitGaineRectangulaire").value = localStorage.getItem("debitGaineRectangulaire");
		else
			document.getElementById("debitGaineRectangulaire").value = 1000;

		if(localStorage.hasOwnProperty("vitesseMaxGaineRectangulaire"))
			document.getElementById("vitesseMaxGaineRectangulaire").value = localStorage.getItem("vitesseMaxGaineRectangulaire");
		else
			document.getElementById("vitesseMaxGaineRectangulaire").value = 7;

		if(localStorage.hasOwnProperty("pdcMaxGaineRectangulaire"))
			document.getElementById("pdcMaxGaineRectangulaire").value = localStorage.getItem("pdcMaxGaineRectangulaire");
		else
			document.getElementById("pdcMaxGaineRectangulaire").value = 1;

		if(localStorage.hasOwnProperty("largeurGaineRectangulaire"))
			document.getElementById("largeurGaineRectangulaire").value = localStorage.getItem("largeurGaineRectangulaire");
		else
			document.getElementById("largeurGaineRectangulaire").value = 500;

		if(localStorage.hasOwnProperty("hauteurGaineRectangulaire"))
			document.getElementById("hauteurGaineRectangulaire").value = localStorage.getItem("hauteurGaineRectangulaire");
		else
			document.getElementById("hauteurGaineRectangulaire").value = 500;

		if (localStorage.hasOwnProperty("typeCalcul")) {
				var allElems = document.getElementsByTagName('input');
				for (i = 0; i < allElems.length; i++) {
						if (allElems[i].type == 'radio' && localStorage.getItem("typeCalcul")==allElems[i].value ) {
								allElems[i].checked = true;
								radioclick(localStorage.getItem("typeCalcul"));
						}
				}
		}
		else
		{
			radioclick(1);
		}
}
