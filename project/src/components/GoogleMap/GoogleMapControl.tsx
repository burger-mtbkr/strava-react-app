/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { IStravaActivity } from 'src/models';
import GoogleMapContainer from './GoogleMapContainer';

const googleScript = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&callback=initMap&v=weekly`;

const GoogleMapControl = (activity: IStravaActivity) => (
  <GoogleMapContainer
    googleMapURL={googleScript}
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: '250px', width: '100%' }} />}
    mapElement={<div style={{ height: `100%` }} />}
    {...activity}
  />
);

export default GoogleMapControl;
