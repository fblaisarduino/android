========================================== debut ======================
========================================== debut ======================
========================================== debut ======================
projet pour avoir un cellulaire de recherche de trame LLDP
20 21,22 ,23 avril 2020
francois blais
mtl qc
hardware
===========
cellulaire doit etre rooter et avoir un dongle ethernet fonctionnel
doit avoir tcpdump installer dans le repertoire /system/xbin
fichier resultat de la commande tcpdump pour test
============
6:00:33.903662 LLDP, length 321
Chassis ID TLV (1), length 7
Subtype MAC address (4): 10:cd:ae:e7:18:01 (oui Unknown)
Port ID TLV (2), length 7
Subtype MAC address (3): 10:cd:ae:e7:18:49 (oui Unknown)
Time to Live TLV (3), length 2: TTL 120s
Port Description TLV (4), length 13: Unit 2 Port 8
System Name TLV (5), length 23: R104-CARC3156-115.1.200
System Description TLV (6), length 76
Ethernet Routing Switch 4850GTS-PWR+ HW:14 FW:5.8.0.1 SW:v5.8.3.017
System Capabilities TLV (7), length 4
System Capabilities [Bridge, Router] (0x0014)
Enabled Capabilities [Bridge] (0x0004)
Management Address TLV (8), length 21
Management Address length 5, AFI IPv4 (1): 10.115.1.200
Unknown Interface Numbering (1): 0
OID length 9+\0x06\0x01\0x04\0x01-\0x03N\0x02
Organization specific TLV (127), length 6: OUI Ethernet bridged (0x0080c2)
Port VLAN Id Subtype (1)
port vlan id (PVID): 3068
Organization specific TLV (127), length 12: OUI IEEE 802.3 Private (0x00120f)
Power via MDI Subtype (2)
MDI power support [PSE, supported, enabled], power pair signal, power class class0
Organization specific TLV (127), length 7: OUI ANSI/TIA (0x0012bb)
LLDP-MED Capabilities Subtype (1)
Media capabilities [LLDP-MED capabilities, network policy, location identification, extended power via MDI-PSE, Inventory] (0x002f)
Device type [network connectivity] (0x04)
Organization specific TLV (127), length 7: OUI ANSI/TIA (0x0012bb)
Extended power-via-MDI Subtype (4)
Power type [PD device], Power source [PSE - primary power source]
Power priority [low] (0x03), Power 32.0 Watts
Organization specific TLV (127), length 12: OUI ANSI/TIA (0x0012bb)
Inventory - hardware revision Subtype (5)
Hardware revision 14
Organization specific TLV (127), length 13: OUI ANSI/TIA (0x0012bb)
Inventory - firmware revision Subtype (6)
Firmware revision 5.8.0.1
Organization specific TLV (127), length 14: OUI ANSI/TIA (0x0012bb)
Inventory - software revision Subtype (7)
Software revision v5.8.3.017
Organization specific TLV (127), length 16: OUI ANSI/TIA (0x0012bb)
Inventory - serial number Subtype (8)
Serial number 15JP195H73WD
Organization specific TLV (127), length 9: OUI ANSI/TIA (0x0012bb)
Inventory - manufacturer name Subtype (9)
Manufacturer name Avaya
Organization specific TLV (127), length 16: OUI ANSI/TIA (0x0012bb)
Inventory - model name Subtype (10)
Model name 4850GTS-PWR+
Organization specific TLV (127), length 16: OUI Unknown (0x00400d)
0x0000: 0040 0d08 36a5 10cd aee7 1800 0000 0208
End TLV (0), length 0
=====================
fichier /sdcard/fb/trouvedataRes.sh test de formatage
#!/bin/sh
#
# script pour formater les données trouver par tcpdum
#
# en lien avec apps android aswid
#
# fblais avril 2020 mtl
echo > /sdcard/fb/dataRes.txt
awk ' /System Name/{print "local:" substr($7,1,13) ; print "SW-IP:10." substr($7,15,23) } ' /sdcard/fb/data.txt >> /sdcard/fb/dataRes.txt
echo >> /sdcard/fb/dataRes.txt
awk ' /Port Description/{print "Unite:" $8 ; print "Port:" $10 } ' /sdcard/fb/data.txt >> /sdcard/fb/dataRes.txt
echo >> /sdcard/fb/dataRes.txt
awk ' /PVID/{print "VLAN:"$5} ' /sdcard/fb/data.txt >> /sdcard/fb/dataRes.txt
exit
/========================== 1 sortie txt et 2 boutons , 1 sortie et un renouvellez , but pour afficher resultat de la commande linux tcpdump ===================== */
function OnStart()
{
/* ecran */
lay = app.CreateLayout( "Linear", "Vertical,FillXY" );
lay.SetPadding( 0.1, 0.1, 0.1, 0 );
/* affiche donnees */
txt = app.CreateText( "ASWID\nCapteur de trame LLDP", 1, 0.7, "Multiline" );
txt.SetTextSize( 12 );
txt.SetTextColor( "#ff6666ff" );
txt.SetBackColor( "#ffffffff" );
lay.AddChild( txt );
renou_b1 = app.CreateButton( "Renouvellez !", -1, -1, "FillX,Gray" );
renou_b1.SetOnTouch( renou_b1_OnTouch );
lay.AddChild( renou_b1 );
Sort_b2 = app.CreateButton( "Sortir", -1, -1, "FillX,Gray" );
Sort_b2.SetOnTouch( Sort_b2_OnTouch );
lay.AddChild( Sort_b2 );
app.AddLayout( lay );
}
/* ================================= mes fonctions ====================== */
/* =============================== mes fonctions ====================== */
/* ============================ mes fonctions ====================== */
function renou_b1_OnTouch()
{
var res = app.SysExec( "tcpdump -w /sdcard/fb/data.txt -s 350 -c 1 -v -i eth0 '(ether[12:2]=0x88cc)' ;exit", "su",1000,15000 );
ip = app.GetIPAddress();
mac = app.GetMacAddress();
var local = app.SysExec("awk ' /System Name/{print substr($7,1,13) } ' /sdcard/fb/data.txt ;exit ", "sh,log" );
var swip = app.SysExec("awk ' /System Name/{print substr($7,15,23) } ' /sdcard/fb/data.txt ;exit ", "sh,log" );
var unit = app.SysExec("awk ' /Port Description/{print $8 } ' /sdcard/fb/data.txt ;exit ", "sh,log" );
var port = app.SysExec("awk ' /Port Description/{print $10 } ' /sdcard/fb/data.txt ;exit ", "sh,log" );
var vlan = app.SysExec("awk ' /PVID/{print $5} ' /sdcard/fb/data.txt ;exit", "sh,log" );
var txtes = "ASWID\nCapteur de trame LLDP\n\n\n" + "Local: " + local + "\nSwitch IP: 10." + swip ;
txtes = txtes + "\nUnite: " + unit + "\nPort: " + port + "\nVlan: " + vlan ;
txtes = txtes + "\nIP: " + ip + "\n\nMac: " + mac ;
txt.SetText(txtes);
}
function Sort_b2_OnTouch()
{
app.Exit();
}
/* ========================================== fin ====================== */
/* ========================================== fin ====================== */
/* ========================================== fin ====================== */
Modifier ou supprimer ça
