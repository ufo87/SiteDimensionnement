const tableauVide = "Aucune solution trouvée";
const materiau = "AN";
const v3v_soupape = "V3V à soupape";
const v3v_spherique = "V3V à boisseau sphérique";
const v2v_soupape = "V2V à soupape";
const v2v_spherique = "V2V à boisseau sphérique";

const debug = false;

var listeDN = ["DN15","DN20","DN25","DN32","DN40","DN50","DN65","DN80","DN100",
                "DN125","DN150","DN200","DN250","DN300","DN350","DN400","DN500","DN600"];
var listeNomVanneTA = ["STAD 15", "STAD 20", "STAD 25", "STAD 32", "STAD 40", "STAD 50", "STAF 65-2", "STAF 80", "STAF 100", "STAF 125", "STAF 150"];
var listeDiamInt = [21.3 - 2 * 2.3,
                    26.9 - 2 * 2.3,
                    33.7 - 2 * 2.9,
                    42.4 - 2 * 2.9,
                    48.3 - 2 * 2.9,
                    60.3 - 2 * 3.2,
                    76.1 - 2 * 3.2,
                    88.9 - 2 * 3.2,
                    114.3 - 2 * 3.6,
                    139.7 - 2 * 4,
                    168.3 - 2 * 4.5,
                    219.1 - 2 * 6.3,
                    273 - 2 * 6.3,
                    323.8 - 2 * 7.1,
                    355.6 - 2 * 7.9,
                    406.4 - 2 * 8.8,
                    457 - 2 * 9.5,
                    508 - 2 * 10.3,
                    609.6 - 2 * 11.1];

var vanneTA_15 = {
                  50:0.127,
                  100:0.212,
                  150:0.314,
                  200:0.571,
                  250:0.877,
                  300:1.38,
                  350:1.98,
                  400:2.52
                };
var vanneTA_20 = {
                  50:0.511,
                  100:0.757,
                  150:1.19,
                  200:1.90,
                  250:2.80,
                  300:3.87,
                  350:4.75,
                  400:5.70
                };
var vanneTA_25 = {
                  50:0.60,
                  100:1.03,
                  150:2.10,
                  200:3.62,
                  250:5.30,
                  300:6.90,
                  350:8.00,
                  400:8.70
                };
var vanneTA_32 = {
                  50:1.14,
                  100:1.90,
                  150:3.10,
                  200:4.66,
                  250:7.10,
                  300:9.50,
                  350:11.80,
                  400:14.20
                };
var vanneTA_40 = {
                  50:1.75,
                  100:3.30,
                  150:4.60,
                  200:6.10,
                  250:8.80,
                  300:12.60,
                  350:16.00,
                  400:19.20
                };
var vanneTA_50 = {
                  50:2.56,
                  100:4.20,
                  150:7.20,
                  200:11.70,
                  250:16.20,
                  300:21.50,
                  350:26.50,
                  400:33.00
                };
var vanneTA_65 = {
                  50:1.80,
                  100:3.40,
                  150:4.90,
                  200:6.50,
                  250:9.30,
                  300:16.30,
                  350:25.60,
                  400:35.30,
                  450:44.50,
                  500:52.00,
                  550:60.50,
                  600:68.00,
                  650:73.00,
                  700:77.00,
                  750:80.50,
                  800:85.00
                };
var vanneTA_80 = {
                    50:2.00,
                    100:4.00,
                    150:6.00,
                    200:8.00,
                    250:11.00,
                    300:14.00,
                    350:19.50,
                    400:29.00,
                    450:41.00,
                    500:55.00,
                    550:68.00,
                    600:80.00,
                    650:92.00,
                    700:103.00,
                    750:113.00,
                    800:120.00
                  };
var vanneTA_100 = {
                  50:2.50,
                  100:6,
                  150:9,
                  200:11.50,
                  250:16,
                  300:26.0,
                  350:44,
                  400:63,
                  450:80,
                  500:98,
                  550:115,
                  600:132,
                  650:145,
                  700:159,
                  750:175,
                  800:190
                };
var vanneTA_125 = {
                  50:5.50,
                  100:10.50,
                  150:15.50,
                  200:21.5,
                  250:27,
                  300:36,
                  350:55,
                  400:83,
                  450:114,
                  500:141,
                  550:167,
                  600:197,
                  650:220,
                  700:249,
                  750:276,
                  800:300
                };
var vanneTA_150 = {
                  50:6.50,
                  100:12,
                  150:22,
                  200:40,
                  250:65,
                  300:100,
                  350:135,
                  400:169,
                  450:207,
                  500:242,
                  550:279,
                  600:312,
                  650:340,
                  700:367,
                  750:391,
                  800:420
                };

var ensembleVanneTA = [vanneTA_15, vanneTA_20, vanneTA_25, vanneTA_32, vanneTA_40, vanneTA_50, vanneTA_65, vanneTA_80, vanneTA_100, vanneTA_125, vanneTA_150];

if (debug)
{
	recuperationInformation();
}

function initV3V(debit1, pdc_ajoutes1, tableau)
{
    debit1 = debit1 / 1000;
    for (var i=0; i < tableau.length; i++)
    {
        tableau[i][4] = Math.pow(debit1 / parseFloat(tableau[i][3]), 2) * 100;
        tableau[i][5] = Math.round((parseFloat(tableau[i][4]) / (parseFloat(tableau[i][4]) + parseFloat(pdc_ajoutes1)))*100)/100;
        tableau[i][4] = Math.round(tableau[i][4]*100)/100;
    }
    return tableau;
}

function recuperationInformation()
{
	  var _debit = 0;
	  var _pdcMax = 0;
    var _tempEau = 0;
    var _tauxGlycol = 0;
    var _pdc_ajoutes = 0;
	  var resultat = new Array();
    var resultatV3V = new Array();

    var tableauV3V_spherique = [
            [v3v_spherique,
            "R3015-P63-S1+LR24A-SR",
            15,
            0.63,
            0,
            0],
            [v3v_spherique,
            "R3015-1-S1+LR24A-SR",
            15,
            1.0,
            0,
            0
            ],
            [v3v_spherique,
            "R3015-1P6-S1+LR24A-SR",
            15,
            1.6,
            0,
            0
            ],
            [v3v_spherique,
            "R3015-2P5-S1+LR24A-SR",
            15,
            2.5,
            0,
            0
            ],
            [v3v_spherique,
            "R3015-4-S1+LR24A-SR",
            15,
            4.0,
            0,
            0
            ],
            [v3v_spherique,
            "R3020-6P3-S2+LR24A-SR",
            20,
            6.3,
            0,
            0
            ],
            [v3v_spherique,
            "R3025-10-S2+LR24A-SR",
            25,
            10,
            0,
            0
            ],
            [v3v_spherique,
            "R3032-16-S3+NR24A-SR",
            32,
            16,
            0,
            0
            ],
            [v3v_spherique,
            "R3040-25-S4+SR24A-SR",
            40,
            25,
            0,
            0
            ],
            [v3v_spherique,
            "R3050-40-S4+SR24A-SR",
            50,
            40,
            0,
            0
            ],
            [v3v_spherique,
            "R3050-58-S4+SR24A-SR",
            50,
            58,
            0,
            0
            ],
            [
            v3v_soupape,
            "H511B+LV24A-SR-TPC/Z",
            15,
            0.63,
            0,
            0],
            [
            v3v_soupape,
            "H512B+LV24A-SR-TPC/Z",
            15,
            1.0,
            0,
            0],
            [
            v3v_soupape,
            "H513B+LV24A-SR-TPC/Z",
            15,
            1.6,
            0,
            0],
            [
            v3v_soupape,
            "H514B+LV24A-SR-TPC/Z",
            15,
            2.5,
            0,
            0],
            [
            v3v_soupape,
            "H515B+LV24A-SR-TPC/Z",
            15,
            4.0,
            0,
            0],
            [
            v3v_soupape,
            "H520B+LV24A-SR-TPC/Z",
            20,
            6.3,
            0,
            0],
            [
            v3v_soupape,
            "H525B+LV24A-SR-TPC/Z",
            25,
            10.0,
            0,
            0],
            [
            v3v_soupape,
            "H532B+LV24A-SR-TPC/Z",
            32,
            16.0,
            0,
            0],
            [
            v3v_soupape,
            "H540B+LV24A-SR-TPC/Z",
            40,
            25.0,
            0,
            0],
            [
            v3v_soupape,
            "H550B+LV24A-SR-TPC/Z",
            50,
            40.0,
            0,
            0],
            [
            v3v_soupape,
            "H764N+SV24A-SR-TPC",
            65,
            58.0,
            0,
            0],
            [
            v3v_soupape,
            "H779N+SV24A-SR-TPC",
            80,
            90.0,
            0,
            0],
            [
            v3v_soupape,
            "H7100N+EV24A-SR-TPC",
            100,
            145.0,
            0,
            0],
            [
            v3v_soupape,
            "H7125N+RV24A-SR",
            125,
            220.0,
            0,
            0],
            [
            v3v_soupape,
            "H7150N+RV24A-SR",
            150,
            320.0,
            0,
            0],
            [
            v3v_soupape,
            "H7200W630-S7+GV12-24-SR-TPC",
            200,
            630.0,
            0,
            0],
            [
            v3v_soupape,
            "H7250W1000-S7+GV12-24-SR-TPC",
            250,
            1000.0,
            0,
            0],
            [
            v2v_spherique,
            "R2015-P63-S1+LR24A-SR",
            15,
            0.63,
            0,
            0],
            [
            v2v_spherique,
            "R2015-1-S1+LR24A-SR",
            15,
            1.0,
            0,
            0],
            [
            v2v_spherique,
            "R2015-1P6-S1+LR24A-SR",
            15,
            1.6,
            0,
            0],
            [
            v2v_spherique,
            "R2015-2P5-S1+LR24A-SR",
            15,
            2.5,
            0,
            0],
            [
            v2v_spherique,
            "R2015-4-S1+LR24A-SR",
            15,
            4.0,
            0,
            0],
            [
            v2v_spherique,
            "R2020-6P3-S2+LR24A-SR",
            20,
            6.3,
            0,
            0],
            [
            v2v_spherique,
            "R2025-10-S2+LR24A-SR",
            25,
            10.0,
            0,
            0],
            [
            v2v_spherique,
            "R2032-16-S3+NR24A-SR",
            32,
            16.0,
            0,
            0],
            [
            v2v_spherique,
            "R2040-25-S3+NR24A-SR",
            40,
            25.0,
            0,
            0],
            [
            v2v_spherique,
            "R2050-40-S4+SR24A-SR",
            50,
            40.0,
            0,
            0],
            [
            v2v_spherique,
            "R6065W63-S8+SR24A-SR-5",
            65,
            63.0,
            0,
            0],
            [
            v2v_spherique,
            "R6080W100-S8+SR24A-SR-5",
            80,
            100.0,
            0,
            0],
            [
            v2v_spherique,
            "R6100W160-S8+GR24A-SR-5",
            100,
            160.0,
            0,
            0],
            [
            v2v_spherique,
            "R6125W250-S8+GR24A-SR-5",
            125,
            250.0,
            0,
            0],
            [
            v2v_spherique,
            "R6150W320-S8+GR24A-SR-5",
            150,
            320.0,
            0,
            0],
            [
            v2v_soupape,
            "H411B+LV24-SR-TPC/Z",
            15,
            0.63,
            0,
            0],
            [
            v2v_soupape,
            "H412B+LV24-SR-TPC/Z",
            15,
            1.0,
            0,
            0],
            [
            v2v_soupape,
            "H413B+LV24-SR-TPC/Z",
            15,
            1.6,
            0,
            0],
            [
            v2v_soupape,
            "H414B+LV24-SR-TPC/Z",
            15,
            2.5,
            0,
            0],
            [
            v2v_soupape,
            "H415B+LV24-SR-TPC/Z",
            15,
            4.0,
            0,
            0],
            [
            v2v_soupape,
            "H420B+LV24-SR-TPC/Z",
            20,
            6.3,
            0,
            0],
            [
            v2v_soupape,
            "H425B+LV24-SR-TPC/Z",
            25,
            10.0,
            0,
            0],
            [
            v2v_soupape,
            "H432B+NV24-SR-TPC/Z",
            32,
            16.0,
            0,
            0],
            [
            v2v_soupape,
            "H440B+NV24-SR-TPC/Z",
            40,
            25.0,
            0,
            0],
            [
            v2v_soupape,
            "H450B+NV24-SR-TPC/Z",
            50,
            40.0,
            0,
            0],
            [
            v2v_soupape,
            "H664N+SV24-SR-TPC",
            65,
            58.0,
            0,
            0],
            [
            v2v_soupape,
            "H679N+SV24-SR-TPC",
            80,
            90.0,
            0,
            0],
            [
            v2v_soupape,
            "H6100S+EV24A-SR-TPC",
            100,
            145.0,
            0,
            0],
            [
            v2v_soupape,
            "H6125S+EV24A-SR",
            125,
            220.0,
            0,
            0],
            [
            v2v_soupape,
            "H6150S+EV24A-SR",
            150,
            320.0,
            0,
            0],
            [
            v2v_soupape,
            "H6000W630-S7+GV12-24-SR-TPC",
            200,
            630.0,
            0,
            0],
            [
            v2v_soupape,
            "H6250W1000-S7+GV12-24-SR-TPC",
            250,
            1000.0,
            0,
            0]
        ];

	if (!debug)
	{
  		_debit = parseFloat(document.getElementById("debitEauCanalisation").value);
  		_pdcMax = parseFloat(document.getElementById("pdcMaxCanalisation").value);
      _tempEau = parseFloat(document.getElementById("temperatureCanalisation").value);
      _tauxGlycol = parseFloat(document.getElementById("tauxGlycolCanalisation").value);
      _pdc_ajoutes = parseFloat(document.getElementById("pdc_ajouteCanalisation").value);
	}

	save();

	if (checkValidity(_debit, _pdcMax, _tempEau, _tauxGlycol)=="")
    {
        if (document.getElementById("phrasePdC_ajoutes"))
            document.getElementById("phrasePdC_ajoutes").remove();
        resultat = calcul(_debit, _pdcMax, _tauxGlycol, _tempEau);
        if (resultat.length==0)
        {
            if (document.getElementById("tableauDN"))
                document.getElementById("tableauDN").remove();
            if (document.getElementById("tableauV3V_spherique"))
                document.getElementById("tableauV3V_spherique").remove();
            if (document.getElementById("tableauTA"))
                document.getElementById("tableauTA").remove();
    }
        else if (isNaN(resultat[0][2]))
        {
            if (document.getElementById("tableauDN"))
                document.getElementById("tableauDN").remove();
            if (document.getElementById("tableauV3V_spherique"))
                document.getElementById("tableauV3V_spherique").remove();
            if (document.getElementById("tableauTA"))
                document.getElementById("tableauTA").remove();
        }
        else
        {
            generate_table(resultat, "tableauDN", ["PDC [daPa/m]", "Vitesse [m/s]", "Diamètre"]);
            document.getElementById('rho').innerHTML = "Masse volumique : " + Math.round(calculMasseVolumiqueEau(_tauxGlycol, _tempEau)) + " kg/m³" + "<br>";
            document.getElementById('rho').innerHTML += "Viscosité : " + Math.round(calculViscosite(_tauxGlycol, _tempEau)*100)/100;
            if (checkValidityPdC(_pdc_ajoutes)=="")
            {
                resultatV3V = initV3V(_debit, _pdc_ajoutes, tableauV3V_spherique);
                resultatV3V = selecV3V(resultatV3V);

                if (resultatV3V.length!=0)
                {
                    if (document.getElementById("phrasePdC_ajoutes"))
                        document.getElementById("phrasePdC_ajoutes").remove();
                    if ( isNaN(resultatV3V[0][5]) )
                    {
                        if (document.getElementById("tableauV3V_spherique"))
                            document.getElementById("tableauV3V_spherique").remove();
                    }
                    else
                    {
                        generate_table(resultatV3V, "tableauV3V_spherique", ["Autorité", "PdC V3V", "Kvs", "Diamètre", "Sélection vanne", "Type"]);
                    }
                }
                else
                {
                    if (document.getElementById("tableauV3V_spherique"))
                        document.getElementById("tableauV3V_spherique").remove();
                }

                var cible = round((0.01 * _debit / Math.pow(_pdc_ajoutes, 0.5)), 2);
                var tableauVanneTA = [];

                for (var i = 0; i < ensembleVanneTA.length; i++)
                {
                    var currentVanne = initVanneTA(ensembleVanneTA[i], cible);
                    if ( currentVanne!=0 && tableauVanneTA.length<3 )
                    {
                        tableauVanneTA.push([listeNomVanneTA[i], listeDN[i], currentVanne[1], currentVanne[0]]);
                    }
                }

                if (tableauVanneTA.length!=0)
                    generate_table(tableauVanneTA, "tableauTA", ["KV", "Nb tours", "Diamètre", "Nom"]);
                else if (document.getElementById("tableauTA"))
                        document.getElementById("tableauTA").remove();
            }
            else
            {
                if (document.getElementById("tableauV3V_spherique"))
                    document.getElementById("tableauV3V_spherique").remove();
                if (document.getElementById("tableauDN"))
                    document.getElementById("tableauDN").remove();
                if (document.getElementById("tableauTA"))
                    document.getElementById("tableauTA").remove();

                document.getElementById('rho').innerHTML = checkValidityPdC(_pdc_ajoutes);
            }
        }
    }
    else
    {
        if (document.getElementById("tableauDN"))
            document.getElementById("tableauDN").remove();
        if (document.getElementById("tableauV3V_spherique"))
            document.getElementById("tableauV3V_spherique").remove();
        if (document.getElementById("phrasePdC_ajoutes"))
            document.getElementById("phrasePdC_ajoutes").remove();
        if (document.getElementById("tableauTA"))
            document.getElementById("tableauTA").remove();

        document.getElementById('rho').innerHTML = checkValidity(_debit, _pdcMax, _tempEau, _tauxGlycol);
    }
}

function checkValidityPdC(pdc)
{
    if (isNaN(pdc) || pdc==='none')
        return "Les PdC sont mal renseignées";
    if (pdc<0)
        return "Les PdC ne peuvent être négatives";

    return "";
}

function checkValidity(_debit, _pdcMax, _tempEau, tauxGlycol)
{
    if (_debit==='none' || _debit==="" || isNaN(_debit))
        return "Le débit est mal renseigné";
    if (_debit==0)
        return "Le débit ne peut être nul";
    if (_debit<0)
        return "Le débit ne peut être négatif";

    if (_pdcMax===null || _pdcMax==='none' || _pdcMax==="" || isNaN(_pdcMax))
        return "Les PdC Max sont mal renseignées";
    if (_pdcMax==0)
        return "Les PdC Max ne peuvent être nulles";
    if (_pdcMax<0)
        return "Les PdC Max ne peuvent être négatives";

    if (_tempEau===null || _tempEau==='none' || _tempEau==="" || isNaN(_tempEau))
        return "La température de l'eau est mal renseignée";
    if (_tempEau>85)
        return "La température de l'eau est trop élevée";
    if (_tempEau<-50)
        return "La température de l'eau est trop faible";

    if (tauxGlycol===null || tauxGlycol==='none' || tauxGlycol==="" || isNaN(tauxGlycol))
        return "Le taux de glycol est mal renseignée";
    if (tauxGlycol>50)
        return "Le taux de glycol est trop élevée";
    if (tauxGlycol<0)
        return "Le taux de glycol ne peut pas être négatif";

    return "";
}

function selecV3V(tableau)
{
    for (var i = 0; i < 5; i++)
    {
        tableau.forEach(function(x){
            if (x[5] < 0.3 || x[5] > 0.6)
                tableau.splice(tableau.indexOf(x), 1);
        });
    }
    return tableau;
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

function compare(a, b)
{
  if (a<b)
     return -1;
  if (a==b)
     return 1;
  return 0;
}

function calcul_dpd(Qv, ro, gD, pd, pr, DP, ga)
{
    var dpd = DP;
    var bt = 0.0;
    var aa = 0.0;
    var bb = 0.0;
    var cc = 0.0;
    var dd = 0.0;
    var m = 0.0;
    var alf = 0.0;
    var K1 = 0.0
    var m1 = 0.0
    var m2 = 0.0;

    bt = pd / gD;
    m = Math.pow(bt,2)
    if (m <= 0.1)
    {
        aa = 0.05;
        bb = 0.598;
        cc = 0.1;
        dd = 0.602;
    }
    else if (m <= 0.2)
    {
        aa = 0.1;
        bb = 0.602;
        cc = 0.2;
        dd = 0.615;
    }
    else if (m <= 0.3)
    {
        aa = 0.2
        bb = 0.615
        cc = 0.3
        dd = 0.634
    }
    else if (m <= 0.4)
    {
        aa = 0.3;
        bb = 0.634;
        cc = 0.4;
        dd = 0.66;
    }
    else if (m <= 0.5)
    {
        aa = 0.4;
        bb = 0.66;
        cc = 0.5;
        dd = 0.695;
    }
    else if (m <= 0.6)
    {
        aa = 0.5;
        bb = 0.695;
        cc = 0.6;
        dd = 0.74;
    }
    else if (m <= 0.7)
    {
        aa = 0.6;
        bb = 0.74;
        cc = 0.7;
        dd = 0.802;
    }

    alf = bb + (m - aa) / (cc - aa) * (dd - bb);

    m1 = ro * Qv / 3600 * 4 / alf / 3.141592 / Math.pow(pd * 0.001, 2) / Math.pow(2 * ro, 0.5);
    K1 = (((0.41 + 0.35 * Math.pow(bt, 4)) / ga) / (pr + 1)) / 100000;
    m2 = (1 - K1 * dpd) * Math.pow(dpd, 0.5);

    while ((Math.abs(m2 - m1) / m2) > 0.005)
    {
        dpd = dpd + 5 / 1000 * DP;
        m2 = (1 - K1 * dpd) * Math.pow(dpd, 0.5);
    }
    dpd = dpd / 10;

    return dpd
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

function calculVitesse(debit, diametre)
{
    var section = 0.0;
    var V = 0.0;
    diametre = diametre / 1000;
    section = Math.PI*Math.pow(diametre, 2) / 4;
    V = (debit/(3600*1000)) / section;
    return V;
}

function reynolds(debit, diametreInt, tauxGlycol, tempEau)
{
    var Re = 0.0;
    Re = 1000*calculVitesse(debit, diametreInt)*diametreInt/calculViscosite(tauxGlycol, tempEau);
    return Re;
}

function calculPdC(materiau, debit, diametre, tauxGlycol, tempEau)
{
    var pdc = 0.0;
    if (reynolds(debit, diametre, tauxGlycol, tempEau)>2320)
    {
        if ((materiau=="CU" || materiau=="PVC") && diametre > 0)
            pdc = 0.45 * calculMasseVolumiqueEau(tauxGlycol, tempEau) * Math.pow(calculViscosite(tauxGlycol, tempEau), 0.25) * Math.pow(debit, 1.75) / Math.pow(diametre, 4.75);
        else if (materiau=="AN" && diametre > 0)
            pdc = 0.55 * calculMasseVolumiqueEau(tauxGlycol, tempEau) * Math.pow(calculViscosite(tauxGlycol, tempEau), 0.13) * Math.pow(debit, 1.87) / Math.pow(diametre, 5.01);
        else
            return 0;
    }
    else if (diametre > 0)
        pdc = 1000*64 / reynolds(debit, diametre, tauxGlycol, tempEau) * calculMasseVolumiqueEau(tauxGlycol, tempEau) * Math.pow(calculVitesse(debit, diametre), 2) / (20 * diametre);
    else
        return 0;
    return pdc;
}

function calculDiametre(debit, pdcVise, tauxGlycol, tempEau)
{
    var i = 0;
    while (pdcVise < calculPdC(materiau, debit, listeDiamInt[i], tauxGlycol, tempEau))
    {
        i = i + 1;
    }
    return listeDiamInt[i];
}

function calcul(debit, pdcVise, tauxGlycol, tempEau)
{
    var diamNominal = 0.0;
    var viscosite = 0.0;
    var masseVolumique = 0.0;
    var tableauResultat = [];

    diamNominal = calculDiametre(debit, pdcVise, tauxGlycol, tempEau);
    viscosite = calculViscosite(tauxGlycol, tempEau);
    masseVolumique = calculMasseVolumiqueEau(tauxGlycol, tempEau);

    var i = -1;
    var x = 3;

    if ( diamNominal == listeDiamInt[0] )
    {
        i = 0;
        x = 2;
    }
    for (i; i<3; i++)
    {
        var table = [];
        table.push(listeDN[listeDiamInt.indexOf(diamNominal)+i]);
        table.push(Math.round(calculVitesse(debit, listeDiamInt[listeDiamInt.indexOf(diamNominal)+i])*100)/100);
        table.push(Math.round(calculPdC(materiau, debit, listeDiamInt[listeDiamInt.indexOf(diamNominal)+i], tauxGlycol, tempEau)*100)/100);
        tableauResultat.push(table);
    }
    return tableauResultat;
}

function round(number, precision)
{
  const factor = 10 ** precision;
  return Math.round(number * factor) / factor;
}

function initVanneTA(vanne, cible)
{
      var tableauCles = Object.keys(vanne);
      var tableauResultat = [];

      for (var i = 0; i < tableauCles.length; i++)
          tableauCles[i] = parseFloat(tableauCles[i]);

      tableauCles.sort(function (a, b) {return -b+a;});

      for (var j = 0; j < tableauCles.length-1 ; j++)
      {
          x1 = tableauCles[j];
          x2 = parseFloat(x1) + 50;
          a = (vanne[x2] - vanne[x1]) / (x2 - x1);
          b = vanne[x1] - x1 * a;

          for (var k = x1; k < x2; k++)
          {
              var y = k * a + b;
              y = round(y, 6);
              tableauResultat.push(y);
          }
      }
      var closest = tableauResultat.indexOf(tableauResultat.find(el => el>=cible));
      closest = closest + 50;
      var max = 0.0;
      if ( (100 < closest) && (closest < Math.max(...tableauCles)*0.9) )
      {
          if (tableauCles[tableauCles.length-1] > 410 ) {
              max = 8;
          }
          else {
              max = 4;
          }

          return [cible, (closest / 100).toString() + " / " + max];
      }
      else
        return 0;
}


function save()
{
	localStorage.setItem('temperatureCanalisation', document.getElementById("temperatureCanalisation").value);
	localStorage.setItem('pdcMaxCanalisation', document.getElementById("pdcMaxCanalisation").value);
	localStorage.setItem('tauxGlycolCanalisation', document.getElementById("tauxGlycolCanalisation").value);
	localStorage.setItem('debitEauCanalisation', document.getElementById("debitEauCanalisation").value);
	localStorage.setItem('pdc_ajouteCanalisation', document.getElementById("pdc_ajouteCanalisation").value);
}

function load()
{
  	if(localStorage.hasOwnProperty("temperatureCanalisation"))
  		document.getElementById("temperatureCanalisation").value = localStorage.getItem("temperatureCanalisation");
  	else
  		document.getElementById("temperatureCanalisation").value = 20;

  	if(localStorage.hasOwnProperty("pdcMaxCanalisation"))
  		document.getElementById("pdcMaxCanalisation").value = localStorage.getItem("pdcMaxCanalisation");
  	else
  		document.getElementById("pdcMaxCanalisation").value = 20;

  	if(localStorage.hasOwnProperty("tauxGlycolCanalisation"))
  		document.getElementById("tauxGlycolCanalisation").value = localStorage.getItem("tauxGlycolCanalisation");
  	else
  		document.getElementById("tauxGlycolCanalisation").value = 0;

    if(localStorage.hasOwnProperty("debitEauCanalisation"))
  		document.getElementById("debitEauCanalisation").value = localStorage.getItem("debitEauCanalisation");
  	else
  		document.getElementById("debitEauCanalisation").value = 1000;

    if(localStorage.hasOwnProperty("pdc_ajouteCanalisation"))
      document.getElementById("pdc_ajouteCanalisation").value = localStorage.getItem("pdc_ajouteCanalisation");
    else
      document.getElementById("pdc_ajouteCanalisation").value = 10;

    recuperationInformation();
}
