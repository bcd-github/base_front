/** @format */

import hasRole from "./permission/hasRole"
import hasPermi from "./permission/hasPermi"
import copyText from "./common/copyText"
import scroll from "./common/scroll"
import waterMarker from "./common/waterMark"
import longpress from "./common/longpress";


export default function directive(app) {
  app.directive("hasRole", hasRole)
  app.directive("hasPermi", hasPermi)
  app.directive("copyText", copyText)
  app.directive("scroll", scroll)
  app.directive("waterMarker", waterMarker)
  app.directive("longpress", longpress)
}
