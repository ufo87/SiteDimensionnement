const tableauVide = "Aucune solution trouvée";
var listeDiam = [];
const listeDiam_formulaAir = [80, 100, 120, 125, 140, 150, 160, 180, 200, 225, 250, 275, 300, 315, 350, 400, 450, 500, 550, 600, 630, 650, 700, 750, 800, 850, 900, 950, 1000];
const listeDiam_ros = [80, 100, 110, 120, 125, 130, 140, 150, 160, 175, 200, 225, 250, 275, 300, 315, 325, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000];
const listeDiam_gindro = [60, 80, 100, 120, 140, 150, 160, 180, 200, 220, 240, 250, 260, 280, 300, 325, 350, 375, 400, 425, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000];

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
	var resultat = new Array();

	if (document.getElementById("erreur_tableau_vide"))
		document.getElementById("erreur_tableau_vide").remove();
	if (document.getElementById("tableauUnique"))
		document.getElementById("tableauUnique").remove();

	if (!debug)
	{
		_debit = parseFloat(document.getElementById("debitGaineRouleeSoudee").value);
		_vitesseMax = parseFloat(document.getElementById("vitesseMaxGaineRouleeSoudee").value);
		_pdcMax = parseFloat(document.getElementById("pdcMaxGaineRouleeSoudee").value);
	}

	save();

	if (document.getElementById("radioBruit_id").checked)
    {
    	if (_debit != "" && _debit>0 && (document.getElementById("iso30_id").checked || (document.getElementById("iso40_id").checked)
    		|| (document.getElementById("isoIndus_id").checked) || (document.getElementById("isoIndusPlus_id").checked)))
    	{
    		resultat = calcul(_debit, _vitesseMax, _pdcMax);
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
					generate_table(resultat, "tableauUnique", ["PDC [daPa/m]", "Bruit [dBA]", "Classe bruit", "Vitesse [m/s]", "Diamètre"]);
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
    		resultat = calcul(_debit, _vitesseMax, _pdcMax);
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
					generate_table(resultat, "tableauUnique", ["PDC [daPa/m]", "Bruit [dBA]", "Classe bruit", "Vitesse [m/s]", "Diamètre"]);
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
					resultat = calcul(_debit, _vitesseMax, _pdcMax);
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
							generate_table(resultat, "tableauUnique", ["PDC [daPa/m]", "Bruit [dBA]", "Classe bruit", "Vitesse [m/s]", "Diamètre"]);
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
    		resultat = calcul(_debit, _vitesseMax, _pdcMax);
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
					generate_table(resultat, "tableauUnique", ["PDC [daPa/m]", "Bruit [dBA]", "Classe bruit", "Vitesse [m/s]", "Diamètre"]);
				}
			}
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
function calculVitesse(Q, diam)
{
	var vitesse = 0.0;
	vitesse = (Q/3600)/(Math.PI*Math.pow(diam*0.001, 2)/4);
    vitesse = Math.round(vitesse*100)/100;
    return vitesse;
}

function masse_volumique_air()
{
	return 1.19;
}

function calculPdc(V, diam)
{
	var dt = 0.0;
	var pdc = 0.0;
    pdc = 0.981*5*masse_volumique_air()*Math.pow(V,1.82)/(Math.pow(diam,1.22));
    return pdc;
}

function calcul_D_equivalent(Q, V, diam)
{
	var pdc = calculPdc(V, diam);
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
		var ns_r;
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

/* calcul les diamètres adaptés à la vitesse */
function calcul(Q, Vmax, PDCmax)
{
	var i = 0;
	var tableau = [];

	for (i=0 ; i<= listeDiam.length ; i++)
	{
			var vitesseIJ = calculVitesse(Q, listeDiam[i]);
			var D_equiv = calcul_D_equivalent(Q, vitesseIJ, listeDiam[i]);
			var pdcIJ = Math.round(calculPdc(vitesseIJ, listeDiam[i])*100)/100;
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
        // Si dimensionnement par 'vitesse max' ###
    	if (document.getElementById("radioVitesseMax_id").checked && (vitesseIJ <= Vmax*1.2) && vitesseIJ>2 )
    	{
    		tableau[tableau.length] = ([listeDiam[i], vitesseIJ, bruit, bruitNR, pdcIJ]);
    	}
			else if (document.getElementById("radioPdcMax_id").checked && (pdcIJ <= PDCmax*1.2) && pdcIJ>0.02 )
    	{
    		tableau[tableau.length] = ([listeDiam[i], vitesseIJ, bruit, bruitNR, pdcIJ]);
    	}

    	else if (document.getElementById("radioBruit_id").checked)
    	{
    		for (x=0; x<liste_bruit.length; x++)
        		if (bruit == liste_bruit[x] && (vitesseIJ <= 20) && vitesseIJ>2)
        			tableau[tableau.length] = ([listeDiam[i], vitesseIJ, bruit, bruitNR, pdcIJ]);
    	}

    	if (document.getElementById("radioVitesseMaxBruit_id").checked && (vitesseIJ <= Vmax*1.2) )
    	{
			for (x=0; x<liste_bruit.length; x++)
        		if (bruit == liste_bruit[x] && (vitesseIJ <= 20) && vitesseIJ>2)
        			tableau[tableau.length] = ([listeDiam[i], vitesseIJ,bruit, bruitNR, pdcIJ]);
    	}
	}
	return tableau;
}

function radioClickFournisseur(x)
{
	if (x==1)
	{
		listeDiam = listeDiam_formulaAir;
	}
	else if (x==2)
	{
		listeDiam = listeDiam_ros;
	}
	else
	{
		listeDiam = listeDiam_gindro;
	}
	if (document.getElementById("radioVitesseMax_id").checked)
	{
		radioclick(1, x);
	}
	else if (document.getElementById("radioBruit_id").checked)
	{
		radioclick(2, x);
	}
	else if (document.getElementById("radioPdcMax_id").checked)
	{
		radioclick(3, x);
	}
	else if (document.getElementById("radioVitesseMaxBruit_id").checked)
	{
		radioclick(4, x);
	}
}

function radioclick(b, x)
{
	if (b==1)
	{
		document.getElementById('vitesseMaxGaineRouleeSoudeeContainer').style.display = 'flex';

		document.getElementById('pdcMaxGaineRouleeSoudeeContainer').style.display = 'none';

		document.getElementById('checkboxDiv').style.display = 'none';

		recuperationInformation();
	}
	else if (b==2)
	{
		document.getElementById('vitesseMaxGaineRouleeSoudeeContainer').style.display = 'none';

		document.getElementById('pdcMaxGaineRouleeSoudeeContainer').style.display = 'none';

		document.getElementById('checkboxDiv').style.display = 'block';

		recuperationInformation();
	}
	else if (b==3)
	{
		document.getElementById('vitesseMaxGaineRouleeSoudeeContainer').style.display = 'none';

		document.getElementById('pdcMaxGaineRouleeSoudeeContainer').style.display = 'flex';

		document.getElementById('checkboxDiv').style.display = 'none';

		recuperationInformation();
	}
	else if (b==4)
	{
		document.getElementById('vitesseMaxGaineRouleeSoudeeContainer').style.display = 'flex';

		document.getElementById('pdcMaxGaineRouleeSoudeeContainer').style.display = 'none';

		document.getElementById('checkboxDiv').style.display = 'block';

		recuperationInformation();
	}
}

function save()
{
		localStorage.setItem('debitGaineRouleeSoudee', document.getElementById("debitGaineRouleeSoudee").value);
		localStorage.setItem('vitesseMaxGaineRouleeSoudee', document.getElementById("vitesseMaxGaineRouleeSoudee").value);
		localStorage.setItem('pdcMaxGaineRouleeSoudee', document.getElementById("pdcMaxGaineRouleeSoudee").value);

		var checkbox = document.getElementById("iso30_id");
    localStorage.setItem("iso30_id", checkbox.checked);
		var checkbox = document.getElementById("iso40_id");
    localStorage.setItem("iso40_id", checkbox.checked);
		var checkbox = document.getElementById("isoIndus_id");
    localStorage.setItem("isoIndus_id", checkbox.checked);
		var checkbox = document.getElementById("isoIndusPlus_id");
    localStorage.setItem("isoIndusPlus_id", checkbox.checked);

		var allElems = document.getElementsByTagName('input');
		for (i = 0; i < allElems.length; i++) {
		    if (allElems[i].type == 'radio' && allElems[i].checked && allElems[i].name=='radio') {
		        localStorage.setItem('typeCalcul', allElems[i].value);
		    }
				else if (allElems[i].type == 'radio' && allElems[i].checked && allElems[i].name=='radioFournisseur') {
						localStorage.setItem('typeFournisseur', allElems[i].value);
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

		if(localStorage.hasOwnProperty("debitGaineRouleeSoudee"))
			document.getElementById("debitGaineRouleeSoudee").value = localStorage.getItem("debitGaineRouleeSoudee");
		else
			document.getElementById("debitGaineRouleeSoudee").value = 1000;

		if(localStorage.hasOwnProperty("vitesseMaxGaineRouleeSoudee"))
			document.getElementById("vitesseMaxGaineRouleeSoudee").value = localStorage.getItem("vitesseMaxGaineRouleeSoudee");
		else
			document.getElementById("vitesseMaxGaineRouleeSoudee").value = 7;

		if(localStorage.hasOwnProperty("pdcMaxGaineRouleeSoudee"))
			document.getElementById("pdcMaxGaineRouleeSoudee").value = localStorage.getItem("pdcMaxGaineRouleeSoudee");
		else
			document.getElementById("pdcMaxGaineRouleeSoudee").value = 1;

		var allElems = document.getElementsByTagName('input');
		if (localStorage.hasOwnProperty("typeCalcul")) {
				for (i = 0; i < allElems.length; i++) {
						if (allElems[i].type == 'radio' && allElems[i].name == 'radio' && localStorage.getItem("typeCalcul")==allElems[i].value ) {
								allElems[i].checked = true;
						}
				}
		}
		else
		{
				for (i = 0; i < allElems.length; i++) {
						if (allElems[i].type == 'radio' && allElems[i].name == 'radio') {
								allElems[i].checked = true;
								break;
						}
				}
		}

		if (localStorage.hasOwnProperty("typeFournisseur")) {
				for (i = 0; i < allElems.length; i++) {
						if (allElems[i].type == 'radio' && allElems[i].name=='radioFournisseur' && localStorage.getItem("typeFournisseur")==allElems[i].value ) {
								allElems[i].checked = true;
						}
				}
		}
		else
		{
				for (i = 0; i < allElems.length; i++) {
						if (allElems[i].type == 'radio' && allElems[i].name=='radioFournisseur' ) {
								allElems[i].checked = true;
								break;
						}
				}
		}

		if (document.getElementById("radioFormulaAir_id").checked)
		{
			radioClickFournisseur(1);
		}
		else if (document.getElementById("radioRos_id").checked)
		{
			radioClickFournisseur(2);
		}
		else if (document.getElementById("radioGindro_id").checked)
		{
			radioClickFournisseur(3);
		}
}
