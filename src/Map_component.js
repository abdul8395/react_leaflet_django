import React, { Component } from 'react';
import L from 'leaflet';
import { Modal, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import $ from 'jquery';
import './map.css';




    const Wrapper=styled.div`
      height:${props => props.height};
    `;
     function savefunc() 
     {
        // alert('im test')
        console.log("test")
        $('#modalclosebtn').trigger( "click" );
     }
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
    // https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
                maxZoom: 20,
                subdomains:['mt0','mt1','mt2','mt3']
            });

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
          // this.setState({ isOpen: true })
            // test()
            $('#mymodalopenbtn').trigger( "click" );
            

            // L.marker(e.latlng).addTo(map);
            // rowcenter.push([e.latlng.lat,e.latlng.lng])
            console.log(e.latlng.lat + ", " + e.latlng.lng)
            // alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
        });
      }
      .bind(this),
      3000
    );
    
    

  }

  render() {
    return (
        <>
        <div className='map' id='map'></div>
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


