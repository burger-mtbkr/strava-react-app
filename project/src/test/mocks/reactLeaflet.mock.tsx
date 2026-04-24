import { ReactNode } from 'react';

type ChildProps = {
  children?: ReactNode;
};

const MapContainer = ({ children }: ChildProps) => (
  <div data-testid="mock-map-container">{children}</div>
);

const TileLayer = () => <div data-testid="mock-tile-layer" />;
const Polyline = () => <div data-testid="mock-polyline" />;
const useMap = () => ({ fitBounds: () => undefined });

const BaseLayer = ({ children }: ChildProps) => (
  <div data-testid="mock-base-layer">{children}</div>
);
const Overlay = ({ children }: ChildProps) => (
  <div data-testid="mock-overlay">{children}</div>
);

const LayersControl = Object.assign(
  ({ children }: ChildProps) => (
    <div data-testid="mock-layers-control">{children}</div>
  ),
  {
    BaseLayer,
    Overlay,
  },
);

export { LayersControl, MapContainer, Polyline, TileLayer, useMap };
