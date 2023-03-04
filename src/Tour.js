import { useTour } from "@reactour/tour";
import {
  Grid,
  Image,
  Button,
  Container,
  Tab,
  Icon,
  Dropdown,
  Dimmer,
  Segment,
} from "semantic-ui-react";
function App() {
  const { setIsOpen } = useTour();

  return (
    <>
      <Segment
        basic
        id="openhelp"
        style={{
          color: "#fff",
          position: "absolute",
          top: 3,
          right: 60,
          opacity: 1,
          padding: 0,
          cursor: "pointer",
        }}
        title="تور معرفی سایت"
        onClick={() => setIsOpen(true)}
      >
        <Icon size="big" name="question circle outline" />
      </Segment>
    </>
  );
}
export default App;
