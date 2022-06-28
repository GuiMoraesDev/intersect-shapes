import { ZoneDTO } from "../dtos";

export const ZONES: ZoneDTO[] = [
  {
    color: "red",
    name: "Zone 1",
    shapeType: "circle",
    shapeData: {
      circle: new google.maps.Circle({
        center: { lat: -22.490246684, lng: -54.304961177 },
        radius: 1671913.2,
      }),
      polygon: null,
    },
  },
];

export const CONFLICTING_ZONES: ZoneDTO[] = [
  {
    color: "blue",
    name: "Zone 2",
    shapeType: "polygon",
    shapeData: {
      circle: null,
      polygon: new google.maps.Polygon({
        paths: [
        { lat: 36.571747488, lng: 21.0515805 },
        { lat: 16.436471719, lng: 64.46954925 },
        { lat: -13.442660162, lng: -6.19451325 },
        { lat: 36.571747488, lng: 21.0515805 },
      ]}),
    },
  },
];

export const DEFAULT_SHAPE_OPTIONS = {
  strokeWeight: 1,
  zIndex: 1,
  className: "",
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
