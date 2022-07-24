import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

export default DefaultIcon;
