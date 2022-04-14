import React, { Component } from 'react';
import L from 'leaflet';
import { FeatureGroup } from "react-leaflet";
import { Modal, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import 'leaflet/dist/leaflet.css';
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import { polylineMeasure } from "leaflet.polylinemeasure";
import "leaflet.polylinemeasure/Leaflet.PolylineMeasure.css";
import styled from 'styled-components';
import $ from 'jquery';
import './map.css';
import axios from 'axios';

var map
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

var greenicon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var redicon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var yellowicon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var blackicon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var blueicon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var greyicon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var SchoolsIcon = new L.Icon({
  iconUrl: 'https://theaustraliaproject.org/scripts/AWIS/marker/TeachersSchools_Icon_Marker.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var color0='gray'
var color1='green'
var color2='pink'
var color3='orange'
var color4='yellow'
var color5='red'
var color6='maroon'
var color7='black'
// var color0='#800026'
// var color1='#BD0026'
// var color2='#E31A1C'
// var color3='#FC4E2A'
// var color4='#FD8D3C'
// var color5='#FED976'
// var color6='#FFEDA0'
var polycoords;
var featuretype;
var allmarkers_arr=[]
var all_data_Layer = new L.LayerGroup()
var legend
    const Wrapper=styled.div`
      height:${props => props.height};
    `;

    // phbtnclick=()=>{
    //   alert('pH btn click');
    // }



     function savefunc() 
     {
        // alert('im test')
        console.log(polycoords)
        console.log(featuretype)
        var polygon_name = $("#polygon_name").val()
        var price = $("#price").val()
        var P_value = $("#P_value").val()
        var K_value = $("#K_value").val()
        var PH_value = $("#PH_value").val()
        var Lime_value = $("#Lime_value").val()
         // send selected name to API
        //  axios.post('https://sheetdb.io/api/v1/vpr1dwxs4ilml?sheet=django_project_data', {
        //   polygon_name:polygon_name,
        //   price:price,
        //   P_value:P_value,
        //   K_value:K_value,
        //   PH_value:PH_value,
        //   Lime_value:Lime_value,
        //   feature_type:featuretype,
        //   coordinates:polycoords
        //   })
        //   .then(function (response) {
        //     $('#modalclosebtn').trigger( "click" );
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
        
       
     }

     
     
    
     var geojson_from_url={
      "id": 1,
      "name": "Farmer Joe",
      "phone_number": "+353858438930",
      "address": "Firoda Kilkenny",
      "map_long_lat": {
        "type": "Point",
        "coordinates": [
          -6.921386718749999,
          52.643063436658885
        ]
      },
      "county": "KK",
      "eir_code": "R95 6X70",
      "longitude": "-7.567800000000000",
      "latitude": "52.809700000000000",
      "farm_type": "D",
      "fields": {
        "type": "FeatureCollection",
        "features": [
          {
            "id": 1,
            "type": "Feature",
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    -7.0587158203125,
                    52.64972919730942
                  ],
                  [
                    -6.85546875,
                    52.66305767075935
                  ],
                  [
                    -6.937866210937501,
                    52.459356636836795
                  ],
                  [
                    -7.0587158203125,
                    52.64972919730942
                  ]
                ]
              ]
            },
            "properties": {
              "field_name": "test",
              "size": "5",
              "p_index":  "4",
              "k_index": 3,
              "pH": "6",
              "SQ": 2,
              "RM": 3
            }
          },
          {
            "id": 2,
            "type": "Feature",
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    -7.00653076171875,
                    52.39990521956092
                  ],
                  [
                    -6.6522216796875,
                    52.3479242945069
                  ],
                  [
                    -6.392669677734375,
                    52.41247205962487
                  ],
                  [
                    -6.5753173828125,
                    52.53794364304724
                  ],
                  [
                    -7.00653076171875,
                    52.39990521956092
                  ]
                ]
              ]
            },
            "properties": {
              "field_name": "test2",
              "size": "6",
              "p_index":  "0.43",
              "k_index": 4,
              "pH": "3",
              "SQ": 1,
              "RM": 4
            }
          },
          {
            "id": 3,
            "type": "Feature",
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    -7.71240234375,
                    52.3688917060255
                  ],
                  [
                    -7.4871826171875,
                    52.17056279155013
                  ],
                  [
                    -7.437744140625,
                    52.24461969494769
                  ],
                  [
                    -7.4871826171875,
                    52.3923633970718
                  ],
                  [
                    -7.71240234375,
                    52.3688917060255
                  ]
                ]
              ]
            },
            "properties": {
              "field_name": "test2",
              "size": "6",
              "p_index":  "0",
              "k_index": 4,
              "pH": "2",
              "SQ": 1,
              "RM": 2
            }
          },
          {
            "id": 4,
            "type": "Feature",
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    -7.734374999999999,
                    52.36218321674427
                  ],
                  [
                    -8.0419921875,
                    52.190772371135374
                  ],
                  [
                    -7.75634765625,
                    52.13011607781287
                  ],
                  [
                    -7.6519775390625,
                    52.119998657638156
                  ],
                  [
                    -7.553100585937499,
                    52.19750685699392
                  ],
                  [
                    -7.734374999999999,
                    52.36218321674427
                  ]
                ]
              ]
            },
            "properties": {
              "field_name": "test2",
              "size": "6",
              "p_index":  "4",
              "k_index": 3,
              "pH": "1",
              "SQ": 0,
              "RM": 1
            }
          },
          {
            "id": 5,
            "type": "Feature",
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    -8.0584716796875,
                    52.18403686498285
                  ],
                  [
                    -7.811279296874999,
                    52.3923633970718
                  ],
                  [
                    -7.8662109375,
                    52.496159531097106
                  ],
                  [
                    -8.0914306640625,
                    52.51956352925745
                  ],
                  [
                    -8.272705078125,
                    52.435920583590125
                  ],
                  [
                    -8.0584716796875,
                    52.18403686498285
                  ]
                ]
              ]
            },
            "properties": {
              "field_name": "test2",
              "size": "6",
              "p_index":  "3",
              "k_index": 2,
              "pH": "0.5",
              "SQ": 4,
              "RM": 3
            }
          },
          {
            "id": 6,
            "type": "Feature",
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    -7.827758789062499,
                    52.552976197007524
                  ],
                  [
                    -7.6080322265625,
                    52.42587274336118
                  ],
                  [
                    -7.393798828125,
                    52.45935663683681
                  ],
                  [
                    -7.6629638671875,
                    52.6130549393468
                  ],
                  [
                    -7.827758789062499,
                    52.552976197007524
                  ]
                ]
              ]
            },
            "properties": {
              "field_name": "test2",
              "size": "6",
              "p_index":  "2",
              "k_index": 1,
              "pH": "5.50",
              "SQ": 3,
              "RM": 2
            }
          }
        ]
      }
    }
    var data=geojson_from_url.fields.features
    // console.log(data[0].properties.pH)

    
    function polygon_maker_by_filter(pname) 
    {
      
      
      if(pname=="pH"){
        for (var i = 0; i < data.length; i++) {
          var poly=L.geoJSON(data[i], {
           style: function(feature) {
             var Priority = data[i].properties.pH;
             if( Priority == 0 ){
              return {
              color: color0,
              fillColor: color0,
              fillOpacity: 0.8
              }
            }
             else if( Priority > 0 && Priority <= 1){
              return {
              color: color1,
              fillColor: color1,
              fillOpacity: 0.8
              }
            }else if(Priority >= 1 && Priority <= 2){
              return {
              color: color2,
              fillColor: color2,
              fillOpacity: 0.8
              }
            }else if(Priority >= 2 && Priority <= 3){
              return {
              color: color3,
              fillColor: color3,
              fillOpacity: 0.8
              }
            }else if(Priority >=3  && Priority <= 4){
              return {
              color: color4,
              fillColor: color4,
              fillOpacity: 0.8
              }
            }else if(Priority >= 4 && Priority <= 5){
              return {
              color: color5,
              fillColor: color5,
              fillOpacity: 0.8
              }
            }
            else if(Priority >= 5 && Priority <= 6){
             return {
             color: color6,
             fillColor: color6,
             fillOpacity: 0.8
             }
           }
           else if(Priority >= 6 && Priority <= 7){
             return {
             color: color7,
             fillColor: color7,
             fillOpacity: 0.8
             }
           }else{
               return {
                 color: "white",
                 fillColor: "white",
                 fillOpacity: 0.8
                 }
             }
           }
         })
         .bindPopup('field_name: '+ data[i].properties.field_name+'<br>size: '+ data[i].properties.size+'<br>p_index: '+ data[i].properties.p_index+'<br>k_index: '+ data[i].properties.k_index+'<br>pH: '+ data[i].properties.pH+'<br>SQ: '+ data[i].properties.SQ+'<br>RM: '+ data[i].properties.RM,{minWidth: 200})
         .bindTooltip('pH '+ data[i].properties.pH,{permanent:true,direction:'center'});
         all_data_Layer.addLayer(poly);
       }
       map.addLayer(all_data_Layer)
        // all_data_Layer.addTo(map);
 
 
            legend = L.control({ position: "bottomright" });
           legend.onAdd = function(map) {
             var div = L.DomUtil.create("div", "legend");
             div.innerHTML += "<h4>pH Legend</h4>";
             div.innerHTML += '<i style="background:'+color7+'"></i><span>6-7</span><br>';
             div.innerHTML += '<i style="background:'+color6+'"></i><span>5-6</span><br>';
             div.innerHTML += '<i style="background:'+color5+'"></i><span>4-5</span><br>';
             div.innerHTML += '<i style="background:'+color4+'"></i><span>3-4</span><br>';
             div.innerHTML += '<i style="background:'+color3+'"></i><span>2-3</span><br>';
             div.innerHTML += '<i style="background:'+color2+'"></i><span>1-2</span><br>';
             div.innerHTML += '<i style="background:'+color1+'"></i><span>0-1</span><br>';
             div.innerHTML += '<i style="background:'+color0+'"></i><span>0-0</span><br>';
      
             return div;
           };
           map.addControl(legend);
           
      }
      if(pname=="p_index"){
        for (var i = 0; i < data.length; i++) {
          var poly=L.geoJSON(data[i], {
           style: function(feature) {
             var Priority = data[i].properties.p_index;
             console.log(Priority)
             if( Priority == 0 ){
              return {
              color: color0,
              fillColor: color0,
              fillOpacity: 0.8
              }
            }
             else if( Priority > 0 && Priority <= 1){
              return {
              color: color1,
              fillColor: color1,
              fillOpacity: 0.8
              }
             }else if(Priority >= 1 && Priority <= 2){
               return {
               color: color2,
               fillColor: color2,
               fillOpacity: 0.8
               }
             }else if(Priority >= 2 && Priority <= 3){
               return {
               color: color3,
               fillColor: color3,
               fillOpacity: 0.8
               }
             }else if(Priority >=3  && Priority <= 4){
               return {
               color: color4,
               fillColor: color4,
               fillOpacity: 0.8
               }
             }
             else{
               return {
                 color: "white",
                 fillColor: "white",
                 fillOpacity: 0.8
                 }
             }
           }
         })
         .bindPopup('field_name: '+ data[i].properties.field_name+'<br>size: '+ data[i].properties.size+'<br>p_index: '+ data[i].properties.p_index+'<br>k_index: '+ data[i].properties.k_index+'<br>pH: '+ data[i].properties.pH+'<br>SQ: '+ data[i].properties.SQ+'<br>RM: '+ data[i].properties.RM,{minWidth: 200})
         .bindTooltip('p_index '+ data[i].properties.p_index,{permanent:true,direction:'center'});
         all_data_Layer.addLayer(poly);
       }
       map.addLayer(all_data_Layer)
 
 
            legend = L.control({ position: "bottomright" });
           legend.onAdd = function(map) {
             var div = L.DomUtil.create("div", "legend");
             div.innerHTML += "<h4>p_index Legend</h4>";
             div.innerHTML += '<i style="background:'+color4+'"></i><span>3-4</span><br>';
             div.innerHTML += '<i style="background:'+color3+'"></i><span>2-3</span><br>';
             div.innerHTML += '<i style="background:'+color2+'"></i><span>1-2</span><br>';
             div.innerHTML += '<i style="background:'+color1+'"></i><span>0-1</span><br>';
             div.innerHTML += '<i style="background:'+color0+'"></i><span>0-0</span><br>';
             return div;
           };
           map.addControl(legend);
      }
      if(pname=="k_index"){
        for (var i = 0; i < data.length; i++) {
          var poly=L.geoJSON(data[i], {
           style: function(feature) {
             var Priority = data[i].properties.k_index;
             if( Priority == 0 ){
              return {
              color: color0,
              fillColor: color0,
              fillOpacity: 0.8
              }
            }
             else if( Priority > 0 && Priority <= 1){
              return {
              color: color1,
              fillColor: color1,
              fillOpacity: 0.8
              }
            }else if(Priority >= 1 && Priority <= 2){
              return {
              color: color2,
              fillColor: color2,
              fillOpacity: 0.8
              }
            }else if(Priority >= 2 && Priority <= 3){
              return {
              color: color3,
              fillColor: color3,
              fillOpacity: 0.8
              }
            }else if(Priority >=3  && Priority <= 4){
              return {
              color: color4,
              fillColor: color4,
              fillOpacity: 0.8
              }
            }
             else{
               return {
                 color: "white",
                 fillColor: "white",
                 fillOpacity: 0.8
                 }
             }
           }
         })
         .bindPopup('field_name: '+ data[i].properties.field_name+'<br>size: '+ data[i].properties.size+'<br>p_index: '+ data[i].properties.p_index+'<br>k_index: '+ data[i].properties.k_index+'<br>pH: '+ data[i].properties.pH+'<br>SQ: '+ data[i].properties.SQ+'<br>RM: '+ data[i].properties.RM,{minWidth: 200})
         .bindTooltip('k_index '+ data[i].properties.k_index,{permanent:true,direction:'center'});
         all_data_Layer.addLayer(poly);
       }
       map.addLayer(all_data_Layer)
 
 
            legend = L.control({ position: "bottomright" });
           legend.onAdd = function(map) {
             var div = L.DomUtil.create("div", "legend");
             div.innerHTML += "<h4>k_index Legend</h4>";
             div.innerHTML += '<i style="background:'+color4+'"></i><span>3-4</span><br>';
             div.innerHTML += '<i style="background:'+color3+'"></i><span>2-3</span><br>';
             div.innerHTML += '<i style="background:'+color2+'"></i><span>1-2</span><br>';
             div.innerHTML += '<i style="background:'+color1+'"></i><span>0-1</span><br>';
             div.innerHTML += '<i style="background:'+color0+'"></i><span>0-0</span><br>';
             return div;
           };
           map.addControl(legend);
      }
       
    }

     
export default class Map extends Component {
  
  state = {
    isOpen: false,
    filterval:'ph'
  };
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });
  
  async componentDidMount (){
     map = L.map('map',{
      attributionControl: false
    }).setView([53.16292816226638, -7.8925780579447755], 7);
   
    var googlestreet   = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
        }).addTo(map)
    var dark  = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png');
    var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
                maxZoom: 20,
                subdomains:['mt0','mt1','mt2','mt3']
            });

            polygon_maker_by_filter("pH") 
            
         


          // axios.get('https://sheetdb.io/api/v1/vpr1dwxs4ilml?sheet=django_project_data').then(resp => {
          //   console.log(resp.data);
          //   var data=resp.data
          //   for (var i = 0; i < data.length; i++) {
          //     if(data[i].feature_type=='marker'){
          //       if(data[i].coordinates !== null && data[i].coordinates !== ''){
          //         allmarkers_arr[i] = L.geoJson(JSON.parse(data[i].coordinates), {
          //             pointToLayer: function(feature, latlng) {
          //               if (data[i].PH_value == "0") {
          //                 // L.marker(latlng, {icon: grey});
          //                 return L.circleMarker(latlng, {
          //                   stroke:false,
          //                   // color: getColor(gtype), // you can call the getColor function
          //                   radius: 5,
          //                   fillColor: color0,
          //                   fillOpacity: 1
          //                 })
          //               }else if(data[i].PH_value == "1"){
          //                 return L.marker(latlng, {icon: yellowicon});
          //                 // return L.circleMarker(latlng, {
          //                 //   stroke:false,
          //                 //   // color: getColor(gtype), // you can call the getColor function
          //                 //   radius: 5,
          //                 //   fillColor: color1,
          //                 //   fillOpacity: 1
          //                 // })
          //               }else if(data[i].PH_value == "2"){
          //                 return L.circleMarker(latlng, {
          //                   stroke:false,
          //                   // color: getColor(gtype), // you can call the getColor function
          //                   radius: 5,
          //                   fillColor: color2,
          //                   fillOpacity: 1
          //                 })
          //               }else if(data[i].PH_value == "3"){
          //                 return L.circleMarker(latlng, {
          //                   stroke:false,
          //                   // color: getColor(gtype), // you can call the getColor function
          //                   radius: 5,
          //                   fillColor: color3,
          //                   fillOpacity: 1
          //                 })
          //               }else if(data[i].PH_value == "4"){
          //                 return L.circleMarker(latlng, {
          //                   stroke:false,
          //                   // color: getColor(gtype), // you can call the getColor function
          //                   radius: 5,
          //                   fillColor: color4,
          //                   fillOpacity: 1
          //                 })
          //               }else if(data[i].PH_value == "5"){
          //                 return L.marker(latlng, {icon: redicon});
          //                 // return L.circleMarker(latlng, {
          //                 //   stroke:false,
          //                 //   // color: getColor(gtype), // you can call the getColor function
          //                 //   radius: 5,
          //                 //   fillColor: color5,
          //                 //   fillOpacity: 1
          //                 // })
          //               }else if(data[i].PH_value == "6"){
          //                 return L.circleMarker(latlng, {
          //                   stroke:false,
          //                   // color: getColor(gtype), // you can call the getColor function
          //                   radius: 5,
          //                   fillColor: color6,
          //                   fillOpacity: 1
          //                 })
          //               }else{
          //                 return L.circleMarker(latlng, {
          //                   stroke:false,
          //                   // color: getColor(gtype), // you can call the getColor function
          //                   radius: 5,
          //                   fillColor: 'white',
          //                   fillOpacity: 1
          //                 })
          //               }
          //             },
          //           onEachFeature: function (feature, layer) {
          //                   layer.bindPopup('id: '+ data[i].id+'<br>polygon_name: '+ data[i].polygon_name+'<br>Price: '+ data[i].price+'<br>P_value: '+ data[i].P_value+'<br>K_value: '+ data[i].K_value+'<br>PH_value: '+ data[i].PH_value+'<br>Lime_value: '+ data[i].Lime_value,{minWidth: 200});                                  
          //                   layer.bindTooltip(data[i].polygon_name,{permanent:false,direction:'center'});
          //                 }
          //         });
                    
          //         all_data_Layer.addLayer(allmarkers_arr[i]);
          //       }
          //     }
          //     if(data[i].feature_type=='polygon'){
          //       var gj={"type": "FeatureCollection","features": [ {"type": "Feature","properties": {},"geometry": { "type": "Point","coordinates": [ 73.828125,27.059125784374068]}}]}
          
          //       var poly=L.geoJSON(JSON.parse(data[i].coordinates), {
          //         style: function(feature) {
          //           var Priority = data[i].PH_value;
          //           if(Priority=='0'){
          //             return {
          //             color: color0,
          //             fillColor: color0,
          //             fillOpacity: 0.8
          //             }
          //           }else if(Priority=='1'){
          //             return {
          //             color: color1,
          //             fillColor: color1,
          //             fillOpacity: 0.8
          //             }
          //           }else if(Priority=='2'){
          //             return {
          //             color: color2,
          //             fillColor: color2,
          //             fillOpacity: 0.8
          //             }
          //           }else if(Priority=='3'){
          //             return {
          //             color: color3,
          //             fillColor: color3,
          //             fillOpacity: 0.8
          //             }
          //           }else if(Priority=='4'){
          //             return {
          //             color: color4,
          //             fillColor: color4,
          //             fillOpacity: 0.8
          //             }
          //           }else if(Priority=='5'){
          //             return {
          //             color: color5,
          //             fillColor: color5,
          //             fillOpacity: 0.8
          //             }
          //           }else if(Priority=='6'){
          //             return {
          //             color: color6,
          //             fillColor: color6,
          //             fillOpacity: 0.8
          //             }
          //           }else{
          //             return {
          //               color: "white",
          //               fillColor: "white",
          //               fillOpacity: 0.8
          //               }
          //           }
          //         }
          //       }).bindPopup('id: '+ data[i].id+'<br>polygon_name: '+ data[i].polygon_name+'<br>Price: '+ data[i].price+'<br>P_value: '+ data[i].P_value+'<br>K_value: '+ data[i].K_value+'<br>PH_value: '+ data[i].PH_value+'<br>Lime_value: '+ data[i].Lime_value,{minWidth: 200})
          //         .bindTooltip('pH '+ data[i].PH_value,{permanent:true,direction:'center'});
          //       all_data_Layer.addLayer(poly);
          //     }
          //   }
          //   all_data_Layer.addTo(map);
          // });




          


    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
  
      var drawControl = new L.Control.Draw({
        position: 'topleft',
        draw:{
          polygon : {
                      allowIntersection: false,
                      showLength: true,
                      metric:['km', 'm']
                  },
          polyline:false,
          marker: true,
          squire: false,
          circlemarker: false,
          rectangle: false,
          circle: false,
           
          },
        edit: {
          featureGroup: drawnItems,
          remove: true,
          edit: true,
  
        }
      });
    
    map.addControl(drawControl);
      
    map.on(L.Draw.Event.CREATED, function (e) {
      console.clear();
      featuretype = e.layerType
      var layer = e.layer;
      // $("#cords").val('');
      var arr = layer.toGeoJSON()
       polycoords = JSON.stringify(arr);
       $('#mymodalopenbtn').trigger( "click" );
      //   geomfordb=arr_for_db
      // // console.log(geomfordb)
      // // console.log(arr_for_db);
      // // $("#cords").val(JSON.stringify(arr_for_db))
      //     // var geom3=geom1.toString();
      //     // console.log(geom3);
      // // var geom=layer.getLatLngs();
  
      // $("#cords").val(arr_for_db);
      // if (type === 'marker') {
      //     layer.bindPopup('A popup!');
      //   }
  
        drawnItems.addLayer(layer);

  
    });
  
  
    map.on('draw:editvertex', function (e) { 
      console.log(e)
      featuretype = e.polyType;
      var poly = e.poly;
      var arr = poly.toGeoJSON()
       polycoords = JSON.stringify(arr);
      $('#mymodalopenbtn').trigger( "click" );
      // geomfordb=arr_for_db
      // // console.log(geomfordb)
      // $("#cords").val(arr_for_db)
    });    
    
    var measuredistance=L.control.polylineMeasure({showUnitControl: true}).addTo(map);
   

    var baseLayers = {
        "Google Street": googlestreet,
        "Google Satellite": googleSat,
        "Dark Map": dark,
            // "LGA Layer": lga
    };
    
    var mylayercontrol= L.control.layers(baseLayers).addTo(map);
    setTimeout(
      function() {
        map.on('click', function(e){
            // $('#mymodalopenbtn').trigger( "click" );
            // L.marker(e.latlng).addTo(map);
            console.log(e.latlng.lat + ", " + e.latlng.lng)
        });
      }
      .bind(this),
      3000
    );
  }

  handleClick = event => {
    console.log(all_data_Layer)
    all_data_Layer.clearLayers();
    map.removeControl(legend);
    if (map.hasLayer(all_data_Layer)){
      
    }
    const btnvalue = event.target.value
    if(event.target.value === 'pH'){
      polygon_maker_by_filter("pH") 
      console.log("pH btn Clicked")
    } else if(event.target.value === 'p_index'){
      polygon_maker_by_filter("p_index") 
      console.log("p_index btn Clicked")
    }
    else{
      polygon_maker_by_filter("k_index") 
      console.log("k_index btn Clicked")
    }
    
    this.setState({filterval: btnvalue})

  }
  



  render() {
    return (
        <>
        <div className='map' id='map'>
        <div className='filtersdiv'>
          <h5 id="fheading">Filter By:</h5>
          <Button className='fbtn' variant="primary" id="fbtn1" value='pH' onClick={this.handleClick}>pH</Button> 
          <Button className='fbtn' variant="primary" id="fbtn2" value='p_index' onClick={this.handleClick}>p_index</Button> 
          <Button className='fbtn' variant="primary" id="fbtn3" value='k_index' onClick={this.handleClick}>k_index</Button> 
        </div>
         
        </div>
        <div id="legend"></div>

        <Button variant="" id="mymodalopenbtn" onClick={this.openModal}>m</Button>  
        <Modal show={this.state.isOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Enter Data To Insert</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-6 col-sm-6 col-xs-6">
                  <div className="form-group">
                  <input type="text" className="form-control" id="polygon_name" name="polygon_name" placeholder="polygon_name" />
                  </div>
                  <br></br>
                  <div className="form-group">
                  <input type="text" className="form-control" id="price" placeholder="price"  name="price" />
                  </div>
                  <br></br>
                  <div className="form-group">
                  <input type="number" step="0.01" className="form-control" maxLength="1" size="1" min='0' max='4' id="P_value" placeholder="P_value"  name="P_value" />
                  </div>
              </div>
              <div className="col-md-6 col-sm-6 col-xs-6">
                  <div className="form-group">
                  <input type="number" className="form-control" maxLength="1" size="1" min='0' max='4' id="K_value" placeholder="K_value"  name="K_value" />
                  </div>
                  <br></br>
                  <div className="form-group">
                  <input type="number" className="form-control" maxLength="1" size="1" min='0' max='8' id="PH_value" name="PH_value" placeholder="PH_value" />
                  </div>
                  <br></br>
                  <div className="form-group">
                  <input type="number" className="form-control" maxLength="2" size="2" min='0' max='10' id="Lime_value" placeholder="Lime_value"  name="Lime_value" />
                  </div>
      
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" id="modalclosebtn" onClick={this.closeModal}>Close</Button>
            <Button variant="success" onClick={()=>{savefunc()}}>Save</Button>
          </Modal.Footer>
        </Modal>
        </>
    )
    // return <Wrapper height="100vh" id="map" />;
  }
}


