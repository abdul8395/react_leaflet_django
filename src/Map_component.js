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
    const Wrapper=styled.div`
      height:${props => props.height};
    `;


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
         axios.post('https://sheetdb.io/api/v1/vpr1dwxs4ilml?sheet=django_project_data', {
          polygon_name:polygon_name,
          price:price,
          P_value:P_value,
          K_value:K_value,
          PH_value:PH_value,
          Lime_value:Lime_value,
          feature_type:featuretype,
          coordinates:polycoords
          })
          .then(function (response) {
            $('#modalclosebtn').trigger( "click" );
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
       
     }


     
export default class Map extends Component {
  
  state = {
    isOpen: false,
  };
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });
  
  componentDidMount (){
    var map = L.map('map',{
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



          axios.get('https://sheetdb.io/api/v1/vpr1dwxs4ilml?sheet=django_project_data').then(resp => {
            console.log(resp.data);
            var data=resp.data
            for (var i = 0; i < data.length; i++) {
              if(data[i].feature_type=='marker'){
                if(data[i].coordinates !== null && data[i].coordinates !== ''){
                  allmarkers_arr[i] = L.geoJson(JSON.parse(data[i].coordinates), {
                      pointToLayer: function(feature, latlng) {
                        if (data[i].PH_value == "0") {
                          // L.marker(latlng, {icon: grey});
                          return L.circleMarker(latlng, {
                            stroke:false,
                            // color: getColor(gtype), // you can call the getColor function
                            radius: 5,
                            fillColor: color0,
                            fillOpacity: 1
                          })
                        }else if(data[i].PH_value == "1"){
                          return L.marker(latlng, {icon: yellowicon});
                          // return L.circleMarker(latlng, {
                          //   stroke:false,
                          //   // color: getColor(gtype), // you can call the getColor function
                          //   radius: 5,
                          //   fillColor: color1,
                          //   fillOpacity: 1
                          // })
                        }else if(data[i].PH_value == "2"){
                          return L.circleMarker(latlng, {
                            stroke:false,
                            // color: getColor(gtype), // you can call the getColor function
                            radius: 5,
                            fillColor: color2,
                            fillOpacity: 1
                          })
                        }else if(data[i].PH_value == "3"){
                          return L.circleMarker(latlng, {
                            stroke:false,
                            // color: getColor(gtype), // you can call the getColor function
                            radius: 5,
                            fillColor: color3,
                            fillOpacity: 1
                          })
                        }else if(data[i].PH_value == "4"){
                          return L.circleMarker(latlng, {
                            stroke:false,
                            // color: getColor(gtype), // you can call the getColor function
                            radius: 5,
                            fillColor: color4,
                            fillOpacity: 1
                          })
                        }else if(data[i].PH_value == "5"){
                          return L.marker(latlng, {icon: redicon});
                          // return L.circleMarker(latlng, {
                          //   stroke:false,
                          //   // color: getColor(gtype), // you can call the getColor function
                          //   radius: 5,
                          //   fillColor: color5,
                          //   fillOpacity: 1
                          // })
                        }else if(data[i].PH_value == "6"){
                          return L.circleMarker(latlng, {
                            stroke:false,
                            // color: getColor(gtype), // you can call the getColor function
                            radius: 5,
                            fillColor: color6,
                            fillOpacity: 1
                          })
                        }else{
                          return L.circleMarker(latlng, {
                            stroke:false,
                            // color: getColor(gtype), // you can call the getColor function
                            radius: 5,
                            fillColor: 'white',
                            fillOpacity: 1
                          })
                        }
                      },
                    onEachFeature: function (feature, layer) {
                            layer.bindPopup('id: '+ data[i].id+'<br>polygon_name: '+ data[i].polygon_name+'<br>Price: '+ data[i].price+'<br>P_value: '+ data[i].P_value+'<br>K_value: '+ data[i].K_value+'<br>PH_value: '+ data[i].PH_value+'<br>Lime_value: '+ data[i].Lime_value,{minWidth: 200});                                  
                            layer.bindTooltip(data[i].polygon_name,{permanent:false,direction:'center'});
                          }
                  });
                    
                  all_data_Layer.addLayer(allmarkers_arr[i]);
                }
              }
              if(data[i].feature_type=='polygon'){
                var gj={"type": "FeatureCollection","features": [ {"type": "Feature","properties": {},"geometry": { "type": "Point","coordinates": [ 73.828125,27.059125784374068]}}]}
          
                var poly=L.geoJSON(JSON.parse(data[i].coordinates), {
                  style: function(feature) {
                    var Priority = data[i].PH_value;
                    if(Priority=='0'){
                      return {
                      color: color0,
                      fillColor: color0,
                      fillOpacity: 0.8
                      }
                    }else if(Priority=='1'){
                      return {
                      color: color1,
                      fillColor: color1,
                      fillOpacity: 0.8
                      }
                    }else if(Priority=='2'){
                      return {
                      color: color2,
                      fillColor: color2,
                      fillOpacity: 0.8
                      }
                    }else if(Priority=='3'){
                      return {
                      color: color3,
                      fillColor: color3,
                      fillOpacity: 0.8
                      }
                    }else if(Priority=='4'){
                      return {
                      color: color4,
                      fillColor: color4,
                      fillOpacity: 0.8
                      }
                    }else if(Priority=='5'){
                      return {
                      color: color5,
                      fillColor: color5,
                      fillOpacity: 0.8
                      }
                    }else if(Priority=='6'){
                      return {
                      color: color6,
                      fillColor: color6,
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
                }).bindPopup('id: '+ data[i].id+'<br>polygon_name: '+ data[i].polygon_name+'<br>Price: '+ data[i].price+'<br>P_value: '+ data[i].P_value+'<br>K_value: '+ data[i].K_value+'<br>PH_value: '+ data[i].PH_value+'<br>Lime_value: '+ data[i].Lime_value,{minWidth: 200})
                  .bindTooltip('pH '+ data[i].PH_value,{permanent:true,direction:'center'});
                all_data_Layer.addLayer(poly);
              }
            }
            all_data_Layer.addTo(map);
          });




          var legend = L.control({ position: "bottomright" });
          legend.onAdd = function(map) {
            var div = L.DomUtil.create("div", "legend");
            div.innerHTML += "<h4>pH Legend</h4>";
            div.innerHTML += '<i style="background:'+color6+'"></i><span>5-6</span><br>';
            div.innerHTML += '<i style="background:'+color5+'"></i><span>4-5</span><br>';
            div.innerHTML += '<i style="background:'+color4+'"></i><span>3-4</span><br>';
            div.innerHTML += '<i style="background:'+color3+'"></i><span>2-3</span><br>';
            div.innerHTML += '<i style="background:'+color2+'"></i><span>1-2</span><br>';
            div.innerHTML += '<i style="background:'+color1+'"></i><span>0-1</span><br>';
            div.innerHTML += '<i style="background:'+color0+'"></i><span>0-0</span><br>';
     
            return div;
          };
          legend.addTo(map);


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
  
  
    // map.on('draw:editvertex', function (e) { 
    //   console.log(e)
    //   featuretype = e.polyType;
    //   var poly = e.poly;
    //   var arr = poly.toGeoJSON()
    //    polycoords = JSON.stringify(arr);
    //   $('#mymodalopenbtn').trigger( "click" );
    //   // geomfordb=arr_for_db
    //   // // console.log(geomfordb)
    //   // $("#cords").val(arr_for_db)
    // });    
    
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

  render() {
    return (
        <>
        <div className='map' id='map'>
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


