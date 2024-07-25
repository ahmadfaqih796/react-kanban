import { forwardRef, memo } from "react";
import SimpleBar from "simplebar-react";
/**
 * documentation untuk simplebar
 * https://www.npmjs.com/package/simplebar-react?activeTab=readme
 */
const Scrollbar = forwardRef(({ children, ...other }, ref) => {
  return (
    <SimpleBar
      className="h-full"
      scrollableNodeProps={{ ref }}
      clickOnTrack={false}
      {...other}
    >
      {children}
    </SimpleBar>
  );
});

export default memo(Scrollbar);
