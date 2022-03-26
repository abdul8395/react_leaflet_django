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


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});



var polycoords;
    const Wrapper=styled.div`
      height:${props => props.height};
    `;
     function savefunc() 
     {
        // alert('im test')
        console.log("test")
        console.log(polycoords)
        $('#modalclosebtn').trigger( "click" );
     }
     const _created = (e) => console.log(e);
export default class Map extends Component {
  
  state = {
    isOpen: false
  };
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });
  
  componentDidMount (){
    var map = L.map('map').setView([53.16292816226638, -7.8925780579447755], 7);

    var googlestreet   = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
        }).addTo(map)
    var dark  = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png');
    var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
                maxZoom: 20,
                subdomains:['mt0','mt1','mt2','mt3']
            });

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
          marker: false,
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
      var type = e.layerType
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
      var type = e.polyType;
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

  render() {
    return (
        <>
        <div className='map' id='map'>
        </div>

        <Button variant="" id="mymodalopenbtn" onClick={this.openModal}>m</Button>  
        <Modal show={this.state.isOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
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


