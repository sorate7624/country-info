interface Feature {
  type: string;
  properties: {
    name: string;
  };
  id: string;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}

export default Feature;
