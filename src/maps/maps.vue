<template>

  <div class="google-map" :id="mapName">
    <h1>Map</h1>
  </div>
</template>
<script>
export default {
  name: 'google-map',
  props: ['name'],
  data: function () {
    return {
      mapName: this.name + "-map",
      markerCoordinates: [{
        latitude: -1.3166654 ,
        longitude: 36.78333027
      }, {
        latitude: -1.255998976 ,
        longitude: 36.857163238
      }, {
        latitude: -1.250364,
        longitude: 36.89094
      },
      {
        latitude: -1.249197,
        longitude: 36.90304
      },
      {
        latitude: -1.321504,
        longitude: 36.885045
      },
      {
        latitude: -1.282745,
        longitude: 36.752321
      },
      {
        latitude: -1.25649,
        longitude: 36.872114
      },
      {
        latitude: -1.269275,
        longitude: 36.744238
      },
      {
        latitude: -1.276162,
        longitude: 36.913794
      },
      {
        latitude: -1.206415 ,
        longitude: 36.913794
      },
      {
        latitude: -1.249999  ,
        longitude: 36.8833298
      }
      

      ],
      map: null,
      bounds: null,
      markers: []
    }
  },
  mounted: function () {
    this.bounds = new google.maps.LatLngBounds();
    const element = document.getElementById(this.mapName)
    const mapCentre = this.markerCoordinates[0]
    const options = {
      center: new google.maps.LatLng(mapCentre.latitude, mapCentre.longitude)
    }
    this.map = new google.maps.Map(element, options);
    this.markerCoordinates.forEach((coord) => {
 const position = new google.maps.LatLng(coord.latitude, coord.longitude);
      const marker = new google.maps.Marker({ 
        position,
        map: this.map
      });
    this.markers.push(marker)
      this.map.fitBounds(this.bounds.extend(position))
    });
  }
};
</script>
<style scoped>
.google-map {
  width: 1500px;
  height: 635px;
    margin: 0 auto;
  background: gray;
}
</style>