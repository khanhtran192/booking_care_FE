import { Dispatch, SetStateAction } from "react";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface LightBoxProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  sources?: string[];
  indexActive?: number;
}

export const LightBox = ({
  open,
  setOpen,
  sources,
  indexActive,
}: LightBoxProps) => {
  return (
    <Lightbox
      index={indexActive}
      open={open}
      close={() => setOpen(false)}
      plugins={[Fullscreen, Zoom]}
      slides={sources?.map((item) => ({ src: item }))}
    />
  );
};
