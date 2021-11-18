const tableauVide = "Aucune solution trouvée";
const debug = false;

if (debug)
{
	recuperationInformation();
}

function recuperationInformation()
{
		var _temperatureEau = 30;
		var _tauxGlycol = 0;
		var _debit = 0;
		var _puissance = 0;

		var tableauProprietesEau = [];

		if (!debug)
		{
			_temperatureEauAller = parseFloat(document.getElementById("temperatureEauAllerRapide").value);
			_temperatureEauRetour = parseFloat(document.getElementById("temperatureEauRetourRapide").value);
			_tauxGlycol = parseFloat(document.getElementById("tauxGlycolRapide").value);
			_debit = parseFloat(document.getElementById("debitEauRapide").value);
			_puissance = parseFloat(document.getElementById("puissanceRapide").value);
		}

		if (document.getElementById("radioDebitTemperature_id").checked)
			var values = [_temperatureEauAller, _temperatureEauRetour, _tauxGlycol, _debit];
		else if (document.getElementById("radioPuissanceTemperature_id").checked)
			var values = [_temperatureEauAller, _temperatureEauRetour, _tauxGlycol, _puissance];
		else if (document.getElementById("radioPuissanceDebit_id").checked)
			var values = [_tauxGlycol, _debit, _puissance];


	 if (!checkValidity(values) ) // données mal renseignées
	 {
		 document.getElementById('erreur_tableau_vide').innerHTML = "Erreur dans les données";
		 if (document.getElementById("tableauProprietesEau"))
			 document.getElementById("tableauProprietesEau").remove();
		 return;
	 }
	 else // données bien renseignées
	 {
		 if (document.getElementById("radioDebitTemperature_id").checked)
		 {
			 _temperatureEau = ( _temperatureEauAller + _temperatureEauRetour ) / 2;
			 tableauProprietesEau.push([_temperatureEauAller, Math.round(calculMasseVolumiqueEau(_tauxGlycol, _temperatureEauAller)), round(calculViscosite(_tauxGlycol, _temperatureEauAller), 2), Math.round(calculChaleurMassique(_tauxGlycol, _temperatureEauAller))]);
			 tableauProprietesEau.push([_temperatureEau, Math.round(calculMasseVolumiqueEau(_tauxGlycol, _temperatureEau)), round(calculViscosite(_tauxGlycol, _temperatureEau), 2), Math.round(calculChaleurMassique(_tauxGlycol, _temperatureEau))]);
			 tableauProprietesEau.push([_temperatureEauRetour, Math.round(calculMasseVolumiqueEau(_tauxGlycol, _temperatureEauRetour)), round(calculViscosite(_tauxGlycol, _temperatureEauRetour), 2), Math.round(calculChaleurMassique(_tauxGlycol, _temperatureEauRetour))]);

			 generate_table(tableauProprietesEau, "tableauProprietesEau", ["Chaleur spécifique [J/kg.K]", "Visocité", "Masse volumique [kg/m³]", "Température [°C]"]);

			 var puissance = 0;
			 puissance = round(calculMasseVolumiqueEau(_tauxGlycol, _temperatureEau), 9) * _debit / 3600;
			 puissance = puissance * ( Math.abs(_temperatureEauAller - _temperatureEauRetour) );
			 puissance = puissance * round(calculChaleurMassique(_tauxGlycol, _temperatureEau), 9) / 1000;
			 puissance = round(puissance/1000, 2);
			 document.getElementById('erreur_tableau_vide').innerHTML = "P = " + puissance  + " kW";
		 }

		 else if (document.getElementById("radioPuissanceTemperature_id").checked)
		 {
			 _temperatureEau = ( _temperatureEauAller + _temperatureEauRetour ) / 2;
			 tableauProprietesEau.push([_temperatureEauAller, Math.round(calculMasseVolumiqueEau(_tauxGlycol, _temperatureEauAller)), round(calculViscosite(_tauxGlycol, _temperatureEauAller), 2), Math.round(calculChaleurMassique(_tauxGlycol, _temperatureEauAller))]);
			 tableauProprietesEau.push([_temperatureEau, Math.round(calculMasseVolumiqueEau(_tauxGlycol, _temperatureEau)), round(calculViscosite(_tauxGlycol, _temperatureEau), 2), Math.round(calculChaleurMassique(_tauxGlycol, _temperatureEau))]);
			 tableauProprietesEau.push([_temperatureEauRetour, Math.round(calculMasseVolumiqueEau(_tauxGlycol, _temperatureEauRetour)), round(calculViscosite(_tauxGlycol, _temperatureEauRetour), 2), Math.round(calculChaleurMassique(_tauxGlycol, _temperatureEauRetour))]);

			 generate_table(tableauProprietesEau, "tableauProprietesEau", ["Chaleur spécifique [J/kg.K]", "Visocité", "Masse volumique [kg/m³]", "Température [°C]"]);

			 debit = _puissance * Math.round(calculMasseVolumiqueEau(_tauxGlycol, _temperatureEau)) / Math.round(calculChaleurMassique(_tauxGlycol, _temperatureEau));
			 debit = debit / ( Math.abs(_temperatureEauAller - _temperatureEauRetour) );
			 debit = debit * 3.6;
			 debit = round(debit, 2);
			 document.getElementById('erreur_tableau_vide').innerHTML = "Débit = " + debit  + " l/h";
		 }
		 else if (document.getElementById("radioPuissanceDebit_id").checked)
		 {
			 var tempEau = 0;
			 tempEau = _puissance * 1000 / 4182;
			 tempEau = tempEau / (_debit*1000/(3600));
			 tempEau = round(tempEau, 2);
			 document.getElementById('erreur_tableau_vide').innerHTML = "Delta T = " + tempEau  + " °C";
			 if (document.getElementById("tableauProprietesEau"))
				 document.getElementById("tableauProprietesEau").remove();
		 }
		 save();
	 }
}

function checkValidity(array)
{
		for (var i = 0; i < array.length; i++)
		{
				console.log(array[i]);
				if (array[i]==='none' || array[i]==="" || isNaN(array[i]) || array[i]===null)
						return false;
		}
    return true;
}


function calculChaleurMassique(pourcentageGlycol, tempEau)
{
    var cp = 0.0;
    if (pourcentageGlycol == 0)
    {
        if (tempEau <= 5)
        {
            a = -2.51208;
            b = 4216.10760;
        }
        else if (tempEau <= 10)
        {
						a = -2.51208;
						b = 4216.10760;
        }
        else if (tempEau <= 20)
        {
            a = -0.83736;
            b = 4199.36040;
        }
        else if (tempEau <= 40)
        {
            a = -0.20934;
            b = 4186.800;
        }
        else if (tempEau <= 60)
        {
            a = 0.20934;
            b = 4170.05280;
        }
        else if (tempEau > 60)
        {
						a = 0.62802;
						b = 4144.932;
        }
    }
    else if (pourcentageGlycol <= 10)
    {
				if (tempEau <= 0)
				{
						a = -2.09340;
						b = 4132.37160;
				}
        else if (tempEau <= 5)
				{
						a = -1.67472;
						b = 4132.37160;
				}
        else if (tempEau <= 20)
        {
            a = -1.11648;
            b = 4129.58040;
        }
        else if (tempEau <= 40)
        {
            a = -0.41868;
            b = 4115.62440;
        }
        else if (tempEau <= 60)
        {
            a = 0.20934;
            b = 4090.50360;
        }
        else if (tempEau > 60)
        {
            a = 1.04670;
            b = 4040.2620;
        }
    }
    else if (pourcentageGlycol <= 20)
    {
        if (tempEau <= -4)
				{
						a = -1.39560;
						b = 4038.86640;
				}
        else if (tempEau <= 0)
        {
            a = -1.04670;
            b = 4040.2620;
        }
        else if (tempEau <= 5)
        {
            a = -0.83736;
            b = 4040.2620;
        }
        else if (tempEau <= 20)
        {
						a = -0.55824;
						b = 4038.86640;
        }
        else if (tempEau <= 40)
        {
            a = 0.41868;
            b = 4019.3280;
        }
        else if (tempEau <= 60)
        {
            a = 1.46538;
            b = 3977.46;
        }
        else if (tempEau > 60)
        {
            a = 2.09340;
            b = 3939.77880;
        }
    }
    else if (pourcentageGlycol <= 30)
    {
        if (tempEau <= -8)
				{
						a = -1.04670;
						b = 3897.91080;
				}
        else if (tempEau <= -4)
        {
            a = 0;
            b = 3906.28440;
        }
        else if (tempEau <= 0)
        {
            a = -1.04670;
            b = 3902.09760;
        }
        else if (tempEau <= 5)
        {
            a = 0;
            b = 3902.09760;
        }
        else if (tempEau <= 20)
        {
            a = 0.55824;
            b = 3899.30640;
        }
        else if (tempEau <= 40)
        {
            a = 1.46538;
            b = 3881.16360;
        }
        else if (tempEau <= 60)
        {
            a = 2.09340;
            b = 3856.04280;
        }
        else if (tempEau > 60)
        {
            a = 2.72142;
            b = 3818.36160;
        }
    }
    else if (pourcentageGlycol <= 40)
    {
        if (tempEau <= -15)
        {
            a = 0;
            b = 3713.69160;
        }
        else if (tempEau <= -10)
        {
						a = 0.83736;
						b = 3726.2520;
        }
        else if (tempEau <= -5)
        {
						a = 0.83736;
						b = 3726.2520;
        }
        else if (tempEau <= 0)
				{
						a = 0.83736;
						b = 3726.2520;
        }
        else if (tempEau <= 5)
				{
						a = 0.83736;
						b = 3726.2520;
        }
        else if (tempEau <= 20)
				{
						a = 1.67472;
						b = 3722.06520;
        }
        else if (tempEau <= 40)
        {
            a = 2.09340;
            b = 3713.69160;
        }
        else if (tempEau <= 60)
        {
            a = 2.72142;
            b = 3688.57080;
        }
        else if (tempEau > 60)
        {
            a = 2.93076;
            b = 3676.01040;
        }
    }
    else if (pourcentageGlycol <= 50)
    {
        if (tempEau <= -20)
        {
            a = 2.51208;
            b = 3533.6592;
        }
        else if (tempEau <= -15)
        {
            a = 1.67472;
            b = 3516.912;
        }
        else if (tempEau <= -10)
        {
            a = 2.51208;
            b = 3529.4724;
        }
        else if (tempEau <= -5)
        {
            a = 1.67472;
            b = 3521.09880;
        }
        else if (tempEau <= 0)
				{
            a = 2.51208;
            b = 3525.2856;
        }
        else if (tempEau <= 5)
				{
            a = 2.51208;
            b = 3525.2856;
        }
        else if (tempEau <= 20)
				{
            a = 2.51208;
            b = 3525.2856;
        }
        else if (tempEau <= 40)
				{
            a = 2.51208;
            b = 3525.2856;
        }
        else if (tempEau <= 60)
				{
            a = 2.93076;
            b = 3508.53840;
        }
        else if (tempEau > 60)
				{
            a = 2.93076;
            b = 3508.53840;
        }
    }
    cp = a*tempEau + b;
    return cp;
}

function calculMasseVolumiqueEau(pourcentageGlycol, tempEau)
{
    var rho = 0.0;
    if (pourcentageGlycol == 0)
    {
        if (tempEau <= 5)
        {
            a = 0.2;
            b = 999;
        }
        else if (tempEau <= 10)
        {
            a = -1/5;
            b = 1001;
        }
        else if (tempEau <= 20)
        {
            a = -1/10;
            b = 1000;
        }
        else if (tempEau <= 40)
        {
            a = -3/10;
            b = 1004;
        }
        else if (tempEau <= 60)
        {
            a = -9/20;
            b = 1010;
        }
        else if (tempEau > 60)
        {
            a = -9/20;
            b = 1010;
        }
    }
    else if (pourcentageGlycol <= 10)
    {
        if (tempEau <= 5)
            return 1009;
        else if (tempEau <= 20)
        {
            a = -1/5
            b = 1010
        }
        else if (tempEau <= 40)
        {
            a = -3/10
            b = 1012
        }
        else if (tempEau <= 60)
        {
            a = -3/10
            b = 1012
        }
        else if (tempEau > 60)
        {
            a = -1/5
            b = 1006
        }
    }
    else if (pourcentageGlycol <= 20)
    {
        if (tempEau <= -4)
            return 1021;
        else if (tempEau <= 0)
        {
            a = -1/4;
            b = 1020;
        }
        else if (tempEau <= 5)
        {
            a = -1/5;
            b = 1020;
        }
        else if (tempEau <= 20)
        {
            a = -4/15;
            b = 1019 + 4/3;
        }
        else if (tempEau <= 40)
        {
            a = -9/20;
            b = 1024;
        }
        else if (tempEau <= 60)
        {
            a = -9/20;
            b = 1024;
        }
        else if (tempEau > 60)
        {
            a = -9/20;
            b = 1024;
        }
    }
    else if (pourcentageGlycol <= 30)
    {
        if (tempEau <= -8)
            return 1034;
        else if (tempEau <= -4)
        {
            a = +1/4;
            b = 1036;
        }
        else if (tempEau <= 0)
        {
            a = -1/2;
            b = 1031;
        }
        else if (tempEau <= 5)
        {
            a = -1/5;
            b = 1030;
        }
        else if (tempEau <= 20)
        {
            a = -2/5;
            b = 1032;
        }
        else if (tempEau <= 40)
        {
            a = -11/20;
            b = 1035;
        }
        else if (tempEau <= 60)
        {
            a = -3/5;
            b = 1035;
        }
        else if (tempEau > 60)
        {
            a = -11/20;
            b = 1034;
        }
    }
    else if (pourcentageGlycol <= 40)
    {
        if (tempEau <= -15)
        {
            a = -2/5;
            b = 1041;
        }
        else if (tempEau <= -10)
        {
            a = -1/5;
            b = 1044;
        }
        else if (tempEau <= -5)
        {
            a = -2/5;
            b = 1042;
        }
        else if (tempEau <= 0)
        {
            a = -2/5;
            b = 1042;
        }
        else if (tempEau <= 5)
        {
            a = -3/5;
            b = 1042;
        }
        else if (tempEau <= 20)
        {
            a = -7/15;
            b = 1039+7/3;
        }
        else if (tempEau <= 40)
        {
            a = -3/5;
            b = 1044;
        }
        else if (tempEau <= 60)
        {
            a = -7/10;
            b = 1048;
        }
        else if (tempEau > 60)
        {
            a = -4/5;
            b = 1054;
        }
    }
    else if (pourcentageGlycol <= 50)
    {
        if (tempEau <= -20)
        {
            a = -2/5;
            b = 1051;
        }
        else if (tempEau <= -15)
        {
            a = -2/5;
            b = 1051;
        }
        else if (tempEau <= -10)
        {
            a = -2/5;
            b = 1051;
        }
        else if (tempEau <= -5)
        {
            a = -3/5;
            b = 1049;
        }
        else if (tempEau <= 0)
        {
            a = -2/5;
            b = 1050;
        }
        else if (tempEau <= 5)
        {
            a = -3/5;
            b = 1050;
        }
        else if (tempEau <= 20)
        {
            a = -3/5;
            b = 1050;
        }
        else if (tempEau <= 40)
        {
            a = -13/20;
            b = 1051;
        }
        else if (tempEau <= 60)
        {
            a = -3/4;
            b = 1055;
        }
        else if (tempEau > 60)
        {
            a = -17/20;
            b = 1061;
        }
    }
    rho = a*tempEau + b;
    return rho;
}

function calculViscosite(pourcentageGlycol, tempEau)
{
    var mu = 0.0;
    var a = 0.02;
    var b = 0.64;
    if (pourcentageGlycol == 0)
    {
        if (tempEau <= 5)
        {
            a = 0.02;
            b = 0.64;
        }
        else if (tempEau <= 10)
        {
            a = -1/50;
            b = 0.64;
        }
        else if (tempEau <= 20)
        {
            a = -1/100;
            b = 0.64;
        }
        else if (tempEau <= 40)
        {
            a = -0.018;
            b = 1.028;
        }
        else if (tempEau <= 60)
        {
            a = -0.17/20;
            b = 0.99;
        }
        else if (tempEau > 60)
        {
            a = -0.006;
            b = 0.84;
        }
    }
    else if (pourcentageGlycol <= 10)
    {
        if (tempEau <= 0)
        {
            a = -0.21/2;
            b = 2.7;
        }
        else if (tempEau <= 5)
        {
            a = -0.43/5;
            b = 2.7;
        }
        else if (tempEau <= 20)
        {
            a = -0.81/15;
            b = 2.54;
        }
        else if (tempEau <= 40)
        {
            a = -0.55/20;
            b = 2.01;
        }
        else if (tempEau <= 60)
        {
            a = -0.35/20;
            b = 1.61;
        }
        else if (tempEau > 60)
        {
            a = -0.26/20;
            b = 1.34;
        }
    }
    else if (pourcentageGlycol <= 20)
    {
        if (tempEau <= -4)
        {
            a = -0.27;
            b = 4;
        }
        else if (tempEau <= 0)
        {
            a = -0.213;
            b = 4.23;
        }
        else if (tempEau <= 5)
        {
            a = -0.16;
            b = 4.23;
        }
        else if (tempEau <= 20)
        {
            a = -1.4/15;
            b = 2.03+20*1.4/15;
        }
        else if (tempEau <= 40)
        {
            a = -0.043;
            b = 2.89;
        }
        else if (tempEau <= 60)
        {
            a = -0.0245;
            b = 2.15;
        }
        else if (tempEau > 60)
        {
            a = -0.0175;
            b = 1.73;
        }
    }
    else if (pourcentageGlycol <= 30)
    {
        if (tempEau <= -8)
        {
            a = -0.77;
            b = 4.5;
        }
        else if (tempEau <= -4)
        {
            a = -0.555;
            b = 6.22;
        }
        else if (tempEau <= 0)
        {
            a = -0.405;
            b = 6.82;
        }
        else if (tempEau <= 5)
        {
            a = -0.296;
            b = 6.82;
        }
        else if (tempEau <= 20)
        {
            a = -0.16066666666666666667;
            b = 6.14333333333333333333333;
        }
        else if (tempEau <= 40)
        {
            a = -0.068;
            b = 4.29;
        }
        else if (tempEau <= 60)
        {
            a = -0.036;
            b = 3.01;
        }
        else if (tempEau > 60)
        {
            a = -0.024;
            b = 2.29;
        }
    }
    else if (pourcentageGlycol <= 40)
    {
        if (tempEau <= -15)
        {
            a = -3.154;
            b = -16.73;
        }
        else if (tempEau <= -10)
        {
            a = -1.912;
            b = 1.9;
        }
        else if (tempEau <= -5)
        {
            a = -1.204;
            b = 8.98;
        }
        else if (tempEau <= 0)
        {
            a = -0.786;
            b = 11.07;
        }
        else if (tempEau <= 5)
        {
            a = -0.53;
            b = 11.07;
        }
        else if (tempEau <= 20)
        {
            a = -0.276;
            b = 9.8;
        }
        else if (tempEau <= 40)
        {
            a = -0.1075;
            b = 6.43;
        }
        else if (tempEau <= 60)
        {
            a = -0.052;
            b = 4.21;
        }
        else if (tempEau > 60)
        {
            a = -0.032;
            b = 3.01;
        }
    }
    else if (pourcentageGlycol <= 50)
    {
        if (tempEau <= -20)
        {
            a = -10.024;
            b = -118.88;
        }
        else if (tempEau <= -15)
        {
            a = -5.778;
            b = -33.96;
        }
        else if (tempEau <= -10)
        {
            a = -3.464;
            b = 0.75;
        }
        else if (tempEau <= -5)
        {
            a = -2.152;
            b = 13.87;
        }
        else if (tempEau <= 0)
        {
            a = -1.382;
            b = 17.72;
        }
        else if (tempEau <= 5)
        {
            a = -0.918;
            b = 17.72;
        }
        else if (tempEau <= 20)
        {
            a = -0.461333333333333333;
            b = 15.436666666666666666666666667;
        }
        else if (tempEau <= 40)
        {
            a = -0.165;
            b = 9.51;
        }
        else if (tempEau <= 60)
        {
            a = -0.07;
            b = 5.71;
        }
        else if (tempEau > 60)
        {
            a = -0.0395;
            b = 3.88;
        }
    }

    mu = a * tempEau + b;

    if (mu<0)
        alert("erreur pour le calcul de la viscosité");
    return mu;
}


function round(number, precision)
{
  const factor = 10 ** precision;
  return Math.round(number * factor) / factor;
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


function radioclick(a)
{
	if (a == 1) // Température + Débit
	{
		document.getElementById('puissanceRapideContainer').style.display = 'none';

		document.getElementById('debitEauRapideContainer').style.display = 'flex';

		document.getElementById('temperatureEauAllerRapideContainer').style.display = 'flex';

		document.getElementById('temperatureEauRetourRapideContainer').style.display = 'flex';
	}
	else if (a == 2) //Puissance + Température
	{
		document.getElementById('puissanceRapideContainer').style.display = 'flex';

		document.getElementById('debitEauRapideContainer').style.display = 'none';

		document.getElementById('temperatureEauAllerRapideContainer').style.display = 'flex';

		document.getElementById('temperatureEauRetourRapideContainer').style.display = 'flex';
	}
	else if (a == 3) //Puissance + Débit
	{
		document.getElementById('puissanceRapideContainer').style.display = 'flex';

		document.getElementById('debitEauRapideContainer').style.display = 'flex';

		document.getElementById('temperatureEauAllerRapideContainer').style.display = 'none';

		document.getElementById('temperatureEauRetourRapideContainer').style.display = 'none';
	}
	recuperationInformation()
}


function save()
{
	localStorage.setItem('tauxGlycolRapide', document.getElementById("tauxGlycolRapide").value);
	localStorage.setItem('temperatureEauAllerRapide', document.getElementById("temperatureEauAllerRapide").value);
	localStorage.setItem('temperatureEauRetourRapide', document.getElementById("temperatureEauRetourRapide").value);
	localStorage.setItem('debitEauRapide', document.getElementById("debitEauRapide").value);
	localStorage.setItem('puissanceRapide', document.getElementById("puissanceRapide").value);
	var allElems = document.getElementsByTagName('input');
	for (i = 0; i < allElems.length; i++) {
			if (allElems[i].type == 'radio' && allElems[i].checked) {
					localStorage.setItem('typeCalculRapideHydraulique', allElems[i].value);
			}
	}
	console.log("save");
}

function load()
{
	if(localStorage.hasOwnProperty("tauxGlycolRapide"))
		document.getElementById("tauxGlycolRapide").value = localStorage.getItem("tauxGlycolRapide");
	else
		document.getElementById("tauxGlycolRapide").value = 0;

	if(localStorage.hasOwnProperty("temperatureEauAllerRapide"))
		document.getElementById("temperatureEauAllerRapide").value = localStorage.getItem("temperatureEauAllerRapide");
	else
		document.getElementById("temperatureEauAllerRapide").value = 45;

	if(localStorage.hasOwnProperty("temperatureEauRetourRapide"))
		document.getElementById("temperatureEauRetourRapide").value = localStorage.getItem("temperatureEauRetourRapide");
	else
		document.getElementById("temperatureEauRetourRapide").value = 35;

	if(localStorage.hasOwnProperty("debitEauRapide"))
		document.getElementById("debitEauRapide").value = localStorage.getItem("debitEauRapide");
	else
		document.getElementById("debitEauRapide").value = 1000;

	if(localStorage.hasOwnProperty("puissanceRapide"))
		document.getElementById("puissanceRapide").value = localStorage.getItem("puissanceRapide");
	else
		document.getElementById("puissanceRapide").value = 100000;

		if (localStorage.hasOwnProperty("typeCalculRapideHydraulique")) {
				var allElems = document.getElementsByTagName('input');
				for (i = 0; i < allElems.length; i++) {
						if (allElems[i].type == 'radio' && localStorage.getItem("typeCalculRapideHydraulique")==allElems[i].value ) {
								allElems[i].checked = true;
								radioclick(localStorage.getItem("typeCalculRapideHydraulique"));
						}
				}
		}
		else
		{
			radioclick(1);
		}
}
