import { ZoneDTO } from "../dtos";

export const ZONES: ZoneDTO[] = [
  {
    color: "blue",
    name: "Zone 1",
    shapeType: "polygon",
    shapeData: {
      polygon: new google.maps.Polygon({
        paths: [
          { lat: -53.28522, lng: -64.40793 },
          { lat: -33.72419, lng: -13.50395 },
          { lat: -37.55839, lng: -160.46649 },
          { lat: -53.28522, lng: -64.40793 },
        ],
      }),
      circle: null,
    },
  },
  {
    color: "gray",
    name: "Zone 3",
    shapeType: "circle",
    shapeData: {
      polygon: null,
      circle: new google.maps.Circle({
        center: { lat: 30.26712621251091, lng: -27.7347635 },
        radius: 3259778.6201084265,
      }),
    },
  },
];

export const CONFLICTING_ZONES: ZoneDTO[] = [
  {
    color: "blue",
    name: "Zone 2",
    shapeType: "polygon",
    shapeData: {
      polygon: new google.maps.Polygon({
        paths: [
          { lat: 36.571747488, lng: 21.0515805 },
          { lat: 16.436471719, lng: 64.46954925 },
          { lat: -13.442660162, lng: -6.19451325 },
          { lat: 36.571747488, lng: 21.0515805 },
        ],
      }),
      circle: null,
    },
  },
];

export const DEFAULT_SHAPE_OPTIONS = {
  strokeWeight: 1,
  zIndex: 1,
  clickable: false,
  dragable: false,
  editable: false,
};

const MAP_STYLES: google.maps.MapTypeStyle[] = [
  {
    featureType: "administrative.country",
    elementType: "geometry",
    stylers: [
      {
        lightness: 0,
      },
      {
        weight: 0.33,
      },
      {
        color: "#646464",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#969696",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text",
    stylers: [
      {
        weight: 1.69,
      },
      {
        color: "#5f5c5c",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape.natural.landcover",
    elementType: "geometry",
    stylers: [
      {
        saturation: 6,
      },
      {
        weight: 1.25,
      },
    ],
  },
  {
    featureType: "landscape.natural.terrain",
    elementType: "geometry.fill",
    stylers: [
      {
        saturation: 8,
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "poi.attraction",
    elementType: "all",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.business",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.government",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.medical",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "all",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.place_of_worship",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.school",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.sports_complex",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "all",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "all",
    stylers: [
      {
        saturation: -39,
      },
      {
        gamma: 0.83,
      },
      {
        hue: "#00cdff",
      },
      {
        lightness: -2,
      },
    ],
  },
];

export const DEFAULT_MAPS_OPTIONS = {
  zoom: 4,
  minZoom: 3,
  center: { lat: 21.021437, lng: -35.820701 },
  fullscreenControl: false,
  styles: MAP_STYLES,
  restriction: {
    latLngBounds: {
      north: 83.8,
      south: -57,
      west: -180,
      east: 180,
    },
  },
};

export const DEFAULT_SHAPE_METADATA = {
  polygon: null,
  circle: null,
};
