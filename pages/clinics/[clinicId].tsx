import { client } from "../../lib/api";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS, INLINES, helpers } from "@contentful/rich-text-types";
import GoogleMapReact from "google-map-react";

const options = {
  renderMark: {
    [MARKS.BOLD]: (text, key) => <strong key={key}>{text}</strong>,
    [MARKS.ITALIC]: (text, key) => <em key={key}>{text}</em>,
    [MARKS.UNDERLINE]: (text, key) => <u key={key}>{text}</u>,
    [MARKS.CODE]: (text, key) => <code key={key}>{text}</code>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p className="p-2">{children}</p>,
  },
};

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const defaultProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627,
  },
  zoom: 11,
};

const Clinic = ({ clinic }) => {
  return (
    <section>
      <div className=" flex flex-col items-center px-5 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col w-full max-w-3xl mx-auto prose text-left prose-blue">
          <div className="w-full mx-auto">
            <h1 className="text-3xl font-bold p-3">{clinic.fields.clinicName}</h1>
            {documentToReactComponents(clinic.fields.clinicDetails, options)}
          </div>
          <div style={{ height: "500px", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_TOKEN ?? 'no-token',
                language: "en",
              }}
              defaultCenter={{
                lat: clinic.fields.clinicLocation.lat,
                lng: clinic.fields.clinicLocation.lon,
              }}
              defaultZoom={defaultProps.zoom}
            >
              <AnyReactComponent
                lat={clinic.fields.clinicLocation.lat}
                lng={clinic.fields.clinicLocation.lon}
                text="My Marker"
              />
            </GoogleMapReact>
          </div>
        </div>
      </div>
    </section>
  );
};

export const getStaticProps = async ({ params: { clinicId } }) => {
  const clinic = await client
    .getEntries({ "sys.id": clinicId, content_type: "clinic" })
    .then((response: any) => response.items[0]);

  return {
    props: {
      clinic,
    },
  };
};

export const getStaticPaths = async () => {
  const clinics = await client
    .getEntries({ content_type: "clinic" })
    .then((response: any) => response.items);

  const paths = clinics.map((clinic: any) => ({
    params: {
      clinicId: clinic.sys.id,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

export default Clinic;
