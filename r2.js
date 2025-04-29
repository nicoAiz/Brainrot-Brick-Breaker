// --------------------------------------------------
//
//             _________     ____
//             \        |  /  _   \
//              |  ( )  | |__| |  |
//              |      /      /  /
//              |  |\  \    /  /___
//              |__| \__\ |________\
//
// --------------------------------------------------

//              [RaiTwo.ts] (v0.9.2)

// Easy-to-use utility library made for game development and artistic programming

// by Gustavo Nicoletti, 2022 - 2024

// --------------------------------------------------

// #region Logs

// [ ] Create tests for every function [50%]
// [ ] Fix sVec3D and other util functions / factories
// [x] Implement RayCaster
// [ ] Implement more color function
// [ ] Change the way audio is played
// [ ] TEST: Color functions
// [ ] Add quickSort and other sorting functions
// [ ] TEST: Make it so no canvas rendering functions uses integer values to increase performance
// [ ] TEST: KB and KBM
// [ ] Maybe remove spr functions or replace all of them for cnv functions
// [ ] Should I really use JSDoc?
// [ ] TEST: sQuadTree
// [ ] Rework sRoll, improve doc and find better namings
// [x] Rewrite some gfx shape functions so points list are 1D instead of 2D
// [ ] Fix installLoop and switch back to requestAnimationFrame instead of setTimeout
// [ ] ! Create a raitwo.d.ts file documenting all functions of the lib
//    - Remove DOCing from main raitwo.js file
// [ ] Switch from JSDoc to types.ts

// --------------------------------------------------

// # DEPRECATED

// StateMemory
// meetPointCircle2Bool
// meetCircleCircle2Bool

// --------------------------------------------------

// # UPDATE NOTES

// (v0.2) 27/04/2023
// - Updated RNG functions
// - Added line collision functions
// - Fixed some errors

// (v0.2.1) 02/05/2023
// - Added sVec3D and other util functions / factories

// (v0.2.2) 16/06/2023
// - Added sMap2D.traverseAllAsync and sMap2D.traverseSnake
// [!] Removed diagonal from sAABB

// (v0.2.3) 22/06/2023
// - Added sColor struct
// - Removed gfxCanvasBackground
// - Updated gfxGetTextPixels

// --------------------------------------------------

// (v0.3.0) 04/08/2023
// - Refactored Math functions (now it should be faster)
// - Added installMotionHandler

// (v0.3.1) 09/08/2023
// - Moved the helper functions to # Internal helpers
// - Refactored and fixed rtEquals
// - Added new helper functions
// - Added more safety to colorParse and colorType
// - Implemented a proper circle vs circle intersection in meetCircleCircle
// [!] Renamed DepthRenderer.blit() to DepthRenderer.render()

// (v0.3.2) 15/08/2023
// - Fixed loadWebcam
// - Added sprScale and cnvScale
// - Fixed randInt

// --------------------------------------------------

// (v0.4.0) 23/08/2023
// - Added installCamera
// - Updated installGFX, installGFX2 and some other functions
// - Fixed installGFX2
// - Beautified some code
// - No lib function calls mathLerp directly anymore
// - Now most of the canvas rendering functions uses integer values (now it should be faster)
// - Added cnvToImage, cnvToImageCB, loadText and loadTextCB
// - Refactored and fixed installKBM
// - Added, fixed and improved documentation in general
// - Fixed loop.stop()
// - Added new types
// - Tweaked a bunch of color functions, sprGetPixel, meetRectDiamondBool, sVec2D, sColor, sQuadTree and added sQuadTree.reset()

// (v0.4.1) 25/08/2023
// [!] Added 2D Vector math section
//    - Internally works with arrays
//    - Faster and light weight
// - Decided not to bother adding support for 3D Vector math section
// - Tweaked some code in general
// - Added sRoll
// [!] Renamed sAABB.collideAABB to sAABB.collides

// (v0.4.2) 29/08/2023
// - Improved typings
// - Added sStateMachine
// - Added installCoolDownH

// (v0.4.3) 03/09/2023
// - Added a bunch of sMap3D functions for traversing, mapping, copying and more
// - Removed some methods from sMap2D and sMap3D (code using async traverses might break)
// - Added types for merging maps
// [!] Renamed mathOneOverPI to mathONE_OVER_PI
// - Added mathQUARTER_PI
// - Fixed colorParse

// --------------------------------------------------

// (v0.5.0) 04/09/2023
// [!] Modified installGFX and most gfx functions
//    - Now gfx functions act on any gfx, not only the global gfx as before
//    - Began to remove gfxConfig from the code base
//    - Now it returns a special CanvasRenderingContext2D with the previous gfx functions
// - Renamed sMapFrom1D and sMapFrom2D to sMap2DFrom1D and sMap2DFrom2D
// - Added to sMap2D and sMap3D the following methods: getUnsafe() and getSafe()
// - sMap2D.get and sMap3D.get now wont't convert parameters to int anymore. If this is desired, use getSafe() instead
// - Refactored sMap3D and sMap3D to lessen function calling
// [GPT] Typo in sQuadTree.set
// [GPT] Tweaked and refactored lots of code
// - Fixed sVec2DFromAngle
// [!] Reworked and fixed installLoop
//    - Now the frameRate is actually close to the target value
//    - Fixed FPS calculation
// - Added loadTextEncoded and loadTextEncodedCB
// - Added TextEncodingLabels type
// - Added more str functions

// (v0.5.1) 11/09/2023
// - Improved some image processing functions performance
// - Fixed some gfx typos

// (v0.5.2) 12/09/2023
// [!] Added installMobileGP
// [!] installKBM events now send the browser's event as first argument (event, raitwoArgument)
// - Added mathSnap
// - Fixed a bug(?) in installKBM
// [!] Improved support for Mobile by a lot
// [!] Removed all of the spr functions
//    - Now only cnv functions will be supported
//    - Tweaked and rewrote a bunch of functions
// - Improved DOCing
// - Fixed a bug in colorType where the color value #000 would return null

// --------------------------------------------------

// (v0.6.0) 15/09/2023
// [!] Changed every struct to a class
// [!] Renamed Map2D and Map3D to Grid2D and Grid3D
// [!] InVec2D, renamed fromAngle and randAngle to fromPolar and randPolar
// - Added fromPolar to Point2D and rand to Point2D and point3D
// - Added Array region for array manipulation
// - Added a bunch of String functions
// - Renamed gfx.setOpacity to gfx.alpha
// - Added rtGetType, rtGetTypeDescMedium, rtGetTypeDescSmall, rtObjectFromEntries, rtEnum, rtTokenize
// - Removed rtObjectFromEntries because Object.fromEntries already existed
// - Added installLoop.timePassed

// v(0.6.1) 01/10/2023
// - Added the perceptual color space OkLAB and a bunch of conversion functions
// - Minor tweaks
// - Now camera can be constrained using installCam.constrain
// - Removed StateMemory
// - Now mouse handling in installKBM and installMotionHandler accounts for element's border size
// - Added CellularAutomata,
// - Added WaveFunctionCollapse,
// - Added RandomWalk
// - Added arrIntersection
// - Added domDnDWindow
// - Added arr1D, arr2D and arrND
// - Now installKBM listens for mouseenter and mouseleave events instead of mouseover and mouseout

// v(0.6.2) 27/10/2023
// - Added square, fillSquare, strokeSquare and equivalents for squater centered for installGFX
// - Added fast square and circle rendering functions for installGFX
// - Fixed some issues with KBM cursor position handling and refactored some code

// v(0.6.21) 01/01/2024
// - Added traverseArea and traverseAreaReverse to Grid2D
// - Fixed gfx.fastFillSquare
// - Added kill method to Grid2D and Grid3D traverse function

// v(0.6.22) 12/02/2024
// - Minor changes

// v(0.6.23) 17/03/2024
// - Fixed gfx.textBoxed
// - Now gfx.textBoxed support new line caracters properly
// - Added rtMatch

// v(0.6.3) 20/03/2024
// - Added gfx.[strokeRect, fillRect, rect]Transformed
// - Added gfx.imageTransformed
// - Fixed minor bugs with Vec2D class
// - Fixed bugs with the file loading functions
// - Fixed typo in domModal
// - Rewrote fileLoadText to fix an design oversight. Now it does what it really should do
// - Added fileLoadImage, fileLoadVideo (Needs testing) and fileLoadJSON

// v(0.6.4) 13/04/2024
// - Fixed inputGetFile, removed 'important' flag
// - Fixed classes' documentation
// - Added VecND

// v(0.7.0) 20/04/2024
// [!] Renamed most random functions
// - Added gfx.width and gfx.height
// - Fixed randF()
// - Reworking installLoop
// - Fixed fileLoadVideo

// v(0.8.0) 09/06/2024
// - Added installCamera.background and installCamera.bgParallax
// - Now rtExperimental.assetPatternCheckBoard returns HTMLCanvasElement instead of CanvasPattern
// - Fixed some minor errors

// v(0.8.1) 25/06/2024
// - Added loadAudio
// - Fixed some issues with installLoop

// [!] v(0.9) 03/07/2024
// - Ported everything to TypeScript
// - Fixed and removed some functions

// v(0.9.1) 07/07/2024
// - Added region 'Aliases'
// - Fixed and adapted some functions
// - Added rtIsMobile (GPT Assisted)
// - Added gfx.fullscreen and gfx.pointerLock
// - Added Vec2D.xy and Vec2D.yx
// - Added cnvFromImage

// v(0.9.2) 12/07/2024
// - Added methods for rotating and mirroring Grid2D
// - Fixed minor bug with domDiv
// - Added $, $$, $remove and $$remove methods

// TODO: Add a particle system

// #endregion

const validCanvasISources = [
    'HTMLImageElement',
    'SVGImageElement',
    'HTMLVideoElement',
    'HTMLCanvasElement',
    'ImageBitmap',
    'OffscreenCanvas',
    'VideoFrame'
]

// #endregion

// #region Aliases

const isArray = Array.isArray
const arrayFrom = Array.from
const min = Math.min
const max = Math.max
const sign = Math.sign
const hypot = Math.hypot
const sqrt = Math.sqrt
const cbrt = Math.cbrt
const random = Math.random
const atan2 = Math.atan2
const cos = Math.cos
const sin = Math.sin
const tan = Math.tan
const pow = Math.pow
const trunc = Math.trunc
const floor = Math.floor
const round = Math.round
const ceil = Math.ceil
const abs = Math.abs
const objectKeys = Object.keys
const objectValues = Object.values
const objectAssign = Object.assign
const objectIs = Object.is
const jsonParse = JSON.parse
const jsonStringify = JSON.stringify
const promiseAll = Promise.all
const fromCharCode = String.fromCharCode
const pnow = () => performance.now()

/**
* Some keys might not work with the default browser key handling system
* You might wanna check `installKBM` if that is the case
*/
const Keys = Object.freeze({
    SPACE: ' ', TAB: 'Tab', ALT: 'Alt', ESC: 'Escape',
    ENTER: 'Enter', SHIFT: 'shift', CTRL: 'Control', MINUS: '-',
    EQUALS: '=', SLASH: '/', SLASH_B: '\\', TICKS: '\'',
    COMMA: ',', DOT: '.', SEMICOLON: ';', UP: 'ArrowUp',
    LEFT: 'ArrowLeft', DOWN: 'ArrowDown', RIGHT: 'ArrowRight', A: 'a',
    B: 'b', C: 'c', D: 'd', E: 'e',
    F: 'f', G: 'g', J: 'j', I: 'i',
    I: 'i', J: 'j', K: 'k', L: 'l',
    M: 'm', N: 'n', O: 'o', P: 'p',
    Q: 'q', R: 'r', S: 's', T: 't',
    U: 'u', V: 'v', W: 'w', X: 'x',
    Y: 'y', Z: 'z', NUM_0: '0', NUM_1: '1',
    NUM_2: '2', NUM_3: '3', NUM_4: '4', NUM_5: '5',
    NUM_6: '6', NUM_7: '7', NUM_8: '8', NUM_9: '9'
})

// #endregion

// #region Internal helpers

function _canvas(w, h) {
    const cv = document.createElement('canvas')
    cv.width = w
    cv.height = h
    return cv
}

// https://gist.github.com/earthbound19/e7fe15fdf8ca3ef814750a61bc75b5ce
// correlary of first psuedocode block here (f_inv) : https://bottosson.github.io/posts/colorwrong/#what-can-we-do%3F ; 'applying the inverse of the sRGB nonlinear transform function..' -- keeping the abbreviated syntax of arrow functions and ? : if/then, despite that they confuse and stretch my noob brain:
function _gammaToLinear(c) {
    return c >= 0.04045 ? pow((c + 0.055) / 1.055, 2.4) : c / 12.92
}
// correlary of the first ' : '..then switching back' :

function _linearToGamma(c) {
    return c >= 0.0031308 ? 1.055 * pow(c, 1 / 2.4) - 0.055 : 12.92 * c
}

// #endregion

// #region Math

const PI = Math.PI
const ONE_OVER_PI = 1 / PI
const HALF_PI = 0.5 * PI
const QUARTER_PI = 0.5 * HALF_PI
const TWO_PI = 2 * PI
const SQRT2 = Math.SQRT2

/** Returns the sign of a number (1 for positive, -1 for negative, 1 for neutral) */
function mathSign(v) {
    return (+(v >= 0) << 1) - 1
}

/** Snaps a value to the nearest point in an array of points */
function mathSnap(v, points) {
    let min = abs(points[0] - v)
    let minI = 0
    
    for (let i = 1; i < points.length; i++) {
        const diff = abs(points[i] - v)
        if (diff < min) {
            min = diff
            minI = i
        }
    }
    
    return points[minI]
}

/** Linearly interpolates between two values */
function mathLerp(a, b, t) {
    return a + (b - a) * t
}

/** Interpolates values along a curve using linear interpolation */
function mathLerpCurve(curve, t) {
    const len = curve.length
    return mathLerp(
        curve[max(min(len * t), len - 1)],
        curve[max(max(len * t), len - 1)],
        len * t - floor(len * t)
    )
}

/** Scales a value from one range to another */
function mathScale(v, min1, max1, min2, max2) {
    return min2 + ((v - min1) / (max1 - min1)) * (max2 - min2)
}

/** Returns the distance between two 2D coordinates */
function mathDist(x1, y1, x2, y2) {
    return hypot(x1 - x2, y1 - y2)
}

/** Returns the **squared** distance between two 2D coordinates */
function mathDist2(x1, y1, x2, y2) {
    return (x1 - x2) ** 2 + (y1 - y2) ** 2
}

/** Returns the distance between two points A and B
* @param {number[]} a - Array containing each component of A
* @param {number[]} b - Array containing each component of B
*/
function mathDist3(a, b) {
    let sum = 0
    for (let i = 0; i < a.length; i++) {
        sum += (a[i] - b[i]) ** 2
    }
    return sqrt(sum)
}

/** Returns the **squared** distance between two points A and B
* @param {number[]} a - Array containing each component of A
* @param {number[]} b - Array containing each component of B
*/
function mathDist4(a, b) {
    let sum = 0
    for (let i = 0; i < a.length; i++) {
        sum += (a[i] - b[i]) ** 2
    }
    return sum
}

/** Calculates the shortest distance between a point and a line segment defined by two points */
function mathDistPointLine(x, y, x1, y1, x2, y2) {
    const A = x - x1
    const B = y - y1
    const C = x2 - x1
    const D = y2 - y1
    
    const dot = A * C + B * D
    const len_sq = C * C + D * D
    let param = -1
    
    if (len_sq != 0) param = dot / len_sq
    
    let xx, yy
    
    if (param < 0) {
        xx = x1
        yy = y1
    } else if (param > 1) {
        xx = x2
        yy = y2
    } else {
        xx = x1 + param * C
        yy = y1 + param * D
    }
    
    const dx = x - xx
    const dy = y - yy
    
    return sqrt(dx * dx + dy * dy)
}

/** Calculates the **squared** shortest distance between a point and a line segment defined by two points */
function mathDistPointLine2(x, y, x1, y1, x2, y2) {
    const A = x - x1
    const B = y - y1
    const C = x2 - x1
    const D = y2 - y1
    
    const dot = A * C + B * D
    const len_sq = C * C + D * D
    let param = -1
    
    if (len_sq != 0) param = dot / len_sq
    
    let xx, yy
    
    if (param < 0) {
        xx = x1
        yy = y1
    } else if (param > 1) {
        xx = x2
        yy = y2
    } else {
        xx = x1 + param * C
        yy = y1 + param * D
    }
    
    const dx = x - xx
    const dy = y - yy
    
    return dx * dx + dy * dy
}

/** Calculates the angle in **radians** from two 2D coordinates */
function mathPointTo(x1, y1, x2, y2) {
    const theta = -atan2(y2 - y1, x2 - x1)
    return theta < 0 ? theta + TWO_PI : theta
}

/** Calculates the angle in **degrees** from two 2D coordinates */
function mathPointTo2(x1, y1, x2, y2) {
    let theta = -atan2(y2 - y1, x2 - x1)
    theta *= 180 / PI
    return theta < 0 ? (theta = 360 + theta) : theta
}

/** Converts an angle in degrees to radians */
function mathRadians(a) {
    if (a < 0) a = 360 + a
    if (a >= 360) a = a - 360
    return (a * PI) / 180
}

/** Converts an angle in radians to degrees */
function mathDegrees(a) {
    return (a / PI) * 180
}

/** Clamps a value between a minimum and a maximum */
function mathClamp(v, minV, maxV) {
    return min(max(v, minV), maxV)
}

/** Finds the minimum value in an array of numbers */
function mathMin(arr) {
    let min = arr[0]
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < min) min = arr[i]
    }
    return min
}

/** Finds the maximum value in an array of numbers */
function mathMax(arr) {
    let max = arr[0]
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i]
    }
    return max
}

/** Finds both the minimum and maximum values in an array of numbers */
function mathMinMax(arr) {
    let min = arr[0]
    let max = arr[0]
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < min) min = arr[i]
        if (arr[i] > max) max = arr[i]
    }
    return [min, max]
}

/** Finds the index of the minimum value in an array of numbers */
function mathMinIndex(arr) {
    let min = arr[0]
    let index = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i]
            index = i
        }
    }
    return index
}

/** Finds the index of the maximum value in an array of numbers */
function mathMaxIndex(arr) {
    let max = arr[0]
    let index = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i]
            index = i
        }
    }
    return index
}

/** Finds the indices of both the minimum and maximum values in an array of numbers */
function mathMinMaxIndex(arr) {
    let min = arr[0]
    let max = arr[0]
    let indexMin = 0
    let indexMax = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i]
            indexMin = i
        }
        
        if (arr[i] > max) {
            max = arr[i]
            indexMax = i
        }
    }
    return [indexMin, indexMax]
}

/** Calculates the sum of all the numbers in an array */
function mathSum(arr) {
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return sum
}

/** Calculates the average of an array of numbers */
function mathAverage(arr) {
    return mathSum(arr) / arr.length
}

/** Applies a smooth step function to a parameter `t` */
function mathSmoothT(t) {
    let off = t - 0.5
    let pow = 3
    return off < 0
    ? -((-off * 2) ** pow) * 0.5 + 0.5
    : (off * 2) ** pow * 0.5 + 0.5
}

// #endregion

// #region Classes

class ImageLoader {
    toLoad = 0
    keys = []
    
    loaded = {}
    filters = {}
    filtered = {}
    colors = {}
    blocked = false
    waiting = []
    
    static NO_IMAGE = 'NO_IMAGE'
    static EMPTY_IMAGE = gfxCreateGraphic(16, 16, () => {}, true)
    
    get isLoaded() {
        return this.toLoad === 0
    }
    
    addFilter(key, filter) {
        this.filters[key] = filter
    }
    
    block() {
        this.blocked = true
    }
    
    release() {
        this.blocked = false
        
        for (let i = this.waiting.length - 1; i >= 0; i--) {
            this.waiting.pop()()
        }
    }
    
    has(key) {
        return key in this.loaded
    }
    
    get(key) {
        if (key === ImageLoader.NO_IMAGE) return ImageLoader.EMPTY_IMAGE
        if (key in this.loaded) return this.loaded[key]
        return ImageLoader.EMPTY_IMAGE
    }
    
    getWithFilter(key, filterKey) {
        const img = this.loaded[key]
        
        if (!img) return ImageLoader.EMPTY_IMAGE
        if (!(filterKey in this.filters)) return ImageLoader.EMPTY_IMAGE
        if (key in this.filtered[filterKey]) return this.filtered[filterKey][key]
        
        const filtered = this.filters[filterKey](img)
        
        this.filtered[filterKey][key] = filtered
        return filtered
    }
    
    getColor(key) {
        return this.colors[key] ?? '#f0f'
    }
    
    load(key, src, defaultColor, important = true, filter = img => img) {
        this.keys.push(key)
        
        const _load = () => {
            if (important) this.toLoad++
            this.colors[key] = defaultColor
            let img = new Image()
            img.src = src
            img.onload = () => {
                if (important) this.toLoad--
                this.loaded[key] = filter(cnvFromImage(img))
            }
            img.onerror = () => {
                if (important) this.toLoad--
                console.warn(`Asset ${key} (${src}) could not be loaded.`)
            }
        }
        
        if (this.blocked) this.waiting.push(_load)
            else _load()
    }
}

// MARK: QuadTree
/** A Quad Tree is a spatial subdividing tree that can be used to improve performance when handling collisions */
class QuadTree {
    /**
    * @param aabb - The Axis Aligned Bounding Box that defines the tree size
    * @param capacity - The maximum capacity of each tree node
    */
    constructor(aabb, capacity = 4) {
        this.aabb = aabb
        this.capacity = capacity
        this.nodes = []
        this.allNodes = new Map()
        this._isRoot = true
    }
    
    insert(node) {
        if (!this.aabb.collides(node.aabb)) return
        
        if (!this._nw && this.nodes.length > this.capacity) this.subdivide()
            
        if (this._isRoot) this.allNodes.set(node.id, node)
            
        if (!this._nw) {
            this.nodes.push(node)
            if (!node._qt_containers) node._qt_containers = []
            node._qt_containers.push(this.nodes)
            return
        }
        
        if (this._nw.aabb.collides(node.aabb)) this?._nw?.insert?.(node)
        if (this._ne.aabb.collides(node.aabb)) this?._ne?.insert?.(node)
        if (this._sw.aabb.collides(node.aabb)) this?._sw?.insert?.(node)
        if (this._se.aabb.collides(node.aabb)) this?._se?.insert?.(node)
    }
    
    insertAll(list) {
        for (const i of list) {
            this.insert(i)
        }
    }
    
    subdivide() {
        const x = this.aabb.x
        const y = this.aabb.y
        const w = this.aabb.w * 0.5
        const h = this.aabb.h * 0.5
        this._nw = new QuadTree(new AABB(x, y, w, h), this.capacity)
        this._ne = new QuadTree(new AABB(x + w, y, w, h), this.capacity)
        this._sw = new QuadTree(new AABB(x, y + h, w, h), this.capacity)
        this._se = new QuadTree(new AABB(x + w, y + h, w, h), this.capacity)
        this._nw._isRoot = this._ne._isRoot = this._sw._isRoot = this._se._isRoot = false
    }
    
    queryRange(range) {
        const contained = []
        
        if (!this.aabb.collides(range)) return []
        
        for (const n of this.nodes) if (n.aabb.collides(range)) contained.push(n)
            
        if (this._nw && this._ne && this._sw && this._se) {
            const nwRange = this._nw.queryRange(range)
            for (let i = 0; i < nwRange.length; i++) contained.push(nwRange[i])
                const neRange = this._ne.queryRange(range)
            for (let i = 0; i < neRange.length; i++) contained.push(neRange[i])
                const swRange = this._sw.queryRange(range)
            for (let i = 0; i < swRange.length; i++) contained.push(swRange[i])
                const seRange = this._se.queryRange(range)
            for (let i = 0; i < seRange.length; i++) contained.push(seRange[i])
            }
        
        return contained
    }
    
    reset() {
        const nodes = this.nodes
        const len = nodes.length
        this._nw = this._ne = this._sw = this._se = null
        this.allNodes = new Map()
        for (let i = 0; i < len; i++) {
            this.insert(nodes.shift())
        }
    }
    
    remove(id) {
        const node = this.allNodes.get(id)
        if (!node) return
        for (let c of node._qt_containers) {
            const index = c.indexOf(node)
            if (index !== -1) c.splice(index, 1)
        }
    }
    
    set(id, aabb) {
        const node = this.allNodes.get(id)
        if (!node) return
        node.aabb.x = aabb.x
        node.aabb.y = aabb.y
        node.aabb.w = aabb.w
        node.aabb.h = aabb.h
    }
}

// MARK: AABB
/** Creates an Axis Aligned Bounding Box */
class AABB {
    /**
    * @param x - X position of the AABB
    * @param y - Y position of the AABB
    * @param w - Width of the AABB
    * @param h - Height of the AABB
    */
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
    
    collides(aabb) {
        return (
            this.x + this.w > aabb.x &&
            this.x < aabb.x + aabb.w &&
            this.y + this.h > aabb.y &&
            this.y < aabb.y + aabb.h
        )
    }
    
    *[Symbol.iterator]() {
        yield this.x
        yield this.y
        yield this.w
        yield this.h
    }
}

// MARK: Point2D
/** 2D point structure */
class Point2D {
    /**
    * @param x - X position of the point
    * @param y - Y position of the point
    */
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    
    static rand(minX = -1, maxX = 1, minY = -1, maxY = 1) {
        return new Point2D(
            random() * (maxX - minX) + minX,
            random() * (maxY - minY) + minY
        )
    }
    
    static fromPolar(angle, mag = 1) {
        return new Point2D(cos(angle) * mag, -sin(angle) * mag)
    }
    
    get 0() {
        return this.x
    }
    
    get 1() {
        return this.y
    }
    
    *[Symbol.iterator]() {
        yield this.x
        yield this.y
    }
}

// MARK: Point3D
/** 3D point structure */
class Point3D {
    /**
    * @param x - X position of the point
    * @param y - Y position of the point
    * @param z - Z position of the point
    */
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }
    
    static rand(minX = -1, maxX = 1, minY = -1, maxY = 1, minZ = -1, maxZ = 1) {
        return new Point3D(
            random() * (maxX - minX) + minX,
            random() * (maxY - minY) + minY,
            random() * (maxY - minY) + minY
        )
    }
    
    get 0() {
        return this.x
    }
    
    get 1() {
        return this.y
    }
    
    get 2() {
        return this.z
    }
    
    *[Symbol.iterator]() {
        yield this.x
        yield this.y
        yield this.z
    }
}

// MARK: Collider
class Collider {
    /**
    * @param x - X position of the collider
    * @param y - Y position of the collider
    * @param w - Width of the collider
    * @param h - Height of the collider
    * @param centered - Centers the collider at (x, y)
    */
    static fromRect(x, y, w, h) {
        const ox = w * 0.5
        const oy = h * 0.5
        return {
            x,
            y,
            vertices: [
                vec(x - ox, y - oy),
                vec(x - ox + w, y - oy),
                vec(x - ox + w, y - oy + h),
                vec(x - ox, y - oy + h)
            ]
        }
    }
    
    /**
    * @param points - X, Y pairs of coordinates for each point of the shape
    */
    static fromPoints(...points) {
        const vertices = []
        for (let i = 0; i < points.length; i += 2) {
            vertices.push(vec(points[i], points[i + 1]))
        }
        return {
            x: mathAverage(vertices.map(v => v.x)),
            y: mathAverage(vertices.map(v => v.y)),
            vertices
        }
    }
}

// FIXME: Doc is wrong
// MARK: RayCaster
/** 2D ray caster. Uses a lot of trigonometry. Might be slow */
class RayCaster {
    /**
    * Returns a list containing all the rays' hit info respectively
    * @param colliders - List of colliders to cast the rays on
    * @param x - X position of the caster
    * @param y - Y position of the caster
    * @param angle - Angle of the caster
    * @param amount - Amount of rays to cast
    * @param rayLen - Length of the ray
    * @param fov - Fov of the caster
    * @param nPlane - Near plane. Any intersection closer than this will be ignored
    */
    static cast(
        colliders,
        x,
        y,
        angle,
        amount,
        rayLen = 10000,
        fov = 80,
        nPlane = 10
    ) {
        const rays = []
        const hits = []
        const hPlaneHeight = tan((fov / 2) * (PI / 180)) * nPlane
        const np0 = new Vec2D(x, y)
        .add(Vec2D.fromPolar(angle, nPlane))
        .add(Vec2D.fromPolar(angle - HALF_PI, hPlaneHeight))
        const np1 = Vec2D.add(
            np0,
            Vec2D.fromPolar(angle + HALF_PI, 2 * hPlaneHeight)
        )
        const dt = 1 / amount
        const maxT = 1 + dt * 0.5
        
        // Calculate initial ray positions
        for (let t = dt * 0.5; t <= maxT; t += dt) {
            const rx0 = np0.x + (np1.x - np0.x) * t
            const ry0 = np0.y + (np1.y - np0.y) * t
            const ra = atan2(ry0 - y, rx0 - x)
            const rx1 = rx0 + cos(ra) * rayLen
            const ry1 = ry0 + sin(ra) * rayLen
            
            rays.push({
                x0: rx0,
                y0: ry0,
                x1: rx1,
                y1: ry1,
                angle: ra
            })
        }
        
        // Calculate intersections
        for (const r of rays) {
            const hitData = {
                ray: r,
                hit: null,
                colliderIndex: -1,
                sideIndex: -1
            }
            
            for (let j = 0; j < colliders.length; j++) {
                const c = colliders[j]
                const len = c.vertices.length
                let currInternHit
                let currInternHitDist = Infinity
                
                for (let i = 0; i < len; i++) {
                    const cx0 = c.vertices[i].x
                    const cy0 = c.vertices[i].y
                    const cx1 = c.vertices[(i + 1) % len].x
                    const cy1 = c.vertices[(i + 1) % len].y
                    const crossing = meetLineLine(
                        r.x0,
                        r.y0,
                        r.x1,
                        r.y1,
                        cx0,
                        cy0,
                        cx1,
                        cy1
                    )
                    
                    if (!crossing) continue
                    
                    const dist = mathDist2(crossing.x, crossing.y, x, y)
                    
                    if (crossing)
                        if (dist < currInternHitDist) {
                        currInternHit = { crossing, index: i }
                        currInternHitDist = dist
                    }
                }
                
                if (!currInternHit) continue
                if (
                    currInternHitDist >
                    mathDist2(
                        hitData.hit?.x ?? Infinity,
                        hitData.hit?.y ?? Infinity,
                        x,
                        y
                    )
                )
                continue
                
                hitData.hit = currInternHit.crossing
                hitData.sideIndex = currInternHit.index
                hitData.colliderIndex = j
            }
            
            hits.push(hitData)
        }
        
        return hits
    }
}

// TODO: to write
// MARK: PerlinNoise
class PerlinNoise {}

// TODO: add okLab
// MARK: Color
/** Creates a color structure. Helpful when handling colors
* @param {number} r - Red component of the color. Ranges from 0 to 255
* @param {number} g - Green component of the color. Ranges from 0 to 255
* @param {number} b - Blue component of the color. Ranges from 0 to 255
* @param {number} a - Alpha component of the color. Ranges from 0 to 1
*/
class Color {
    constructor(r, g, b, a = 1) {
        this.rgb = this.hsl = this.hex = ''
        this.setRGB(r, g, b, a)
    }
    
    get r() {
        return colorParse(this.rgb)[0]
    }
    
    get g() {
        return colorParse(this.rgb)[1]
    }
    
    get b() {
        return colorParse(this.rgb)[2]
    }
    
    get a() {
        return colorParse(this.rgb)[3]
    }
    
    get h() {
        return colorParse(this.hsl)[0]
    }
    
    get s() {
        return colorParse(this.hsl)[1]
    }
    
    get l() {
        return colorParse(this.hsl)[2]
    }
    
    get brightness() {
        const parsed = colorParse(this.rgb)
        return colorGetBrightness(parsed[0], parsed[1], parsed[2])
    }
    
    set r(v) {
        const c = colorParse(this.rgb)
        this.setRGB(v, c[1], c[2], c[3])
    }
    
    set g(v) {
        const c = colorParse(this.rgb)
        this.setRGB(c[0], v, c[2], c[3])
    }
    
    set b(v) {
        const c = colorParse(this.rgb)
        this.setRGB(c[0], c[1], v, c[3])
    }
    
    set a(v) {
        const c = colorParse(this.rgb)
        this.setRGB(c[0], c[1], c[2], v)
    }
    
    set h(v) {
        const c = colorParse(this.hsl)
        this.setHSL(v, c[1], c[2], c[3])
    }
    
    set s(v) {
        const c = colorParse(this.hsl)
        this.setHSL(c[0], v, c[2], c[3])
    }
    
    set l(v) {
        const c = colorParse(this.hsl)
        this.setHSL(c[0], c[1], v, c[3])
    }
    
    setRGB(r, g, b, a = 1) {
        this.rgb = colorMakeRGB(r, g, b, a)
        this.hsl = colorRGBtoHSL(this.rgb)
        this.hex = colorRGBtoHEX(this.rgb)
        return this
    }
    
    setHSL(h, s, l, a = 1) {
        this.hsl = colorMakeHSL(h, s, l, a)
        this.rgb = colorHSLtoRGB(this.hsl)
        this.hex = colorHSLtoHEX(this.rgb)
        return this
    }
    
    setHEX(hex) {
        this.hex = colorRGBtoHEX(colorHEXtoRGB(hex))
        this.rgb = colorHEXtoRGB(this.hex)
        this.hsl = colorHEXtoHSL(this.hex)
        return this
    }
    
    mix(c, t = 0.5) {
        if (c instanceof Color) return this.mix(c.rgb)
            switch (colorType(c)) {
            case 'HEX':
            c = colorHEXtoRGB(c)
            break
            case 'HSL':
            c = colorHSLtoRGB(c)
            break
            default:
            return this
        }
        const rgb = colorLerp(this.rgb, c, t)
        const p = colorParse(rgb)
        if (p) {
            this.setRGB(p[0], p[1], p[2], p[3])
        }
        return this
    }
    
    randomize(h = [0, 360], s = [30, 70], l = [30, 70]) {
        return this.setHSL(
            randFRange(h[0], h[1]),
            randFRange(s[0], s[1]),
            randFRange(l[0], l[1])
        )
    }
}

// MARK: Grid2D
/** 2D grid structure. Helpful when handling 2D grided data */
class Grid2D {
    /**
    * @param x - X size of the map (width)
    * @param y - Y size of the map (height)
    * @param token - Value to fill the map with. If token is a Function, it will be called for each cell in the map
    */
    constructor(x, y, token = null) {
        this.x = x
        this.y = y
        this._data = new Array(x * y)
        .fill(0)
        .map(() => (token instanceof Function ? token() : token))
    }
    
    static from1D(area, x, y) {
        const map = new Grid2D(x, y)
        let k = 0
        for (let j = 0; j < y; j++)
            for (let i = 0; i < x; i++) map._data[j * x + i] = area[k++]
        return map
    }
    
    static from2D(area) {
        const x = area[0].length
        const y = area.length
        const map = new Grid2D(x, y)
        for (let j = 0; j < y; j++)
            for (let i = 0; i < x; i++) map._data[j * x + i] = area[j * x + i]
        return map
    }
    
    isValid(x, y) {
        return x >= 0 && y >= 0 && x < this.x && y < this.y
    }
    
    getUnsafe(x, y) {
        return this._data[y * this.x + x]
    }
    
    getSafe(x, y) {
        x = floor(x)
        y = floor(y)
        if (x < 0 || y < 0 || x >= this.x || y >= this.y) return null
        return this._data[y * this.x + x]
    }
    
    get(x, y) {
        if (x < 0 || y < 0 || x >= this.x || y >= this.y) return null
        return this._data[y * this.x + x]
    }
    
    getArea1D(x, y, w, h) {
        x = max(0, min(this.x, floor(x)))
        y = max(0, min(this.y, floor(y)))
        w = max(0, min(this.x - x, floor(w)))
        h = max(0, min(this.y - y, floor(h)))
        if (w <= 0 || h <= 0) return []
        const ret = []
        
        for (let i = x; i < x + w; i++)
            for (let j = y; j < y + h; j++) ret.push(this.getUnsafe(i, j))
                
        return ret
    }
    
    getArea2D(x, y, w, h) {
        x = max(0, min(this.x, floor(x)))
        y = max(0, min(this.y, floor(y)))
        w = max(0, min(this.x, floor(w)))
        h = max(0, min(this.y, floor(h)))
        if (w <= 0 || h <= 0) return new Grid2D(0, 0)
            const ret = new Grid2D(w, h)
        
        for (let i = x; i < x + w; i++)
            for (let j = y; j < y + h; j++) ret.set(i - x, j - y, this.get(i, j))
                
        return ret.toArray2D()
    }
    
    setArea(x, y, w, h, token = null) {
        x = max(0, min(this.x, floor(x)))
        y = max(0, min(this.y, floor(y)))
        w = max(0, min(this.x, floor(w)))
        h = max(0, min(this.y, floor(h)))
        if (w <= 0 || h <= 0) return null
        
        for (let i = x; i < x + w; i++)
            for (let j = y; j < y + h; j++) this.set(i, j, token)
            }
    
    setDirect(x, y, token = null) {
        return (this._data[y * this.x + x] = token)
    }
    
    setUnsafe(x, y, token = null) {
        return (this._data[y * this.x + x] = token instanceof Function ? token() : token)
    }
    
    set(x, y, token = null) {
        x = floor(x)
        y = floor(y)
        if (!this.isValid(x, y)) return null
        return (this._data[y * this.x + x] = token instanceof Function ? token() : token)
    }
    
    rotateRight() {
        const ndata = []
        for (let y = 0; y < this.x; y++) {
            for (let x = 0; x < this.y; x++) {
                const nx = y
                const ny = this.y - 1 - x
                ndata.push(this._data[ny * this.x + nx])
            }
        }
        const w = this.x
        this.x = this.y
        this.y = w
        this._data = ndata
        return this
    }
    
    rotateLeft() {
        const ndata = []
        for (let y = 0; y < this.x; y++) {
            for (let x = 0; x < this.y; x++) {
                const nx = this.x - 1 - y
                const ny = x
                ndata.push(this._data[ny * this.x + nx])
            }
        }
        const w = this.x
        this.x = this.y
        this.y = w
        this._data = ndata
        return this
    }
    
    mirrorX() {
        const ndata = []
        for (let y = 0; y < this.y; y++) {
            for (let x = 0; x < this.x; x++) {
                const nx = this.x - 1 - x
                ndata.push(this._data[y * this.x + nx])
            }
        }
        this._data = ndata
        return this
    }
    
    mirrorY() {
        const ndata = []
        for (let y = 0; y < this.y; y++) {
            for (let x = 0; x < this.x; x++) {
                const ny = this.y - 1 - y
                ndata.push(this._data[ny * this.x + x])
            }
        }
        this._data = ndata
        return this
    }
    
    stamp(data, x, y, w, h) {
        for (let i = 0; i < h; i++) {
            for (let j = 0; j < w; j++) {
                this.setDirect(x + j, y + i, data[i * w + j])
            }
        }
    }
    
    putData(data) {
        for (let i = 0; i < data.length; i++) this._data[i] = data[i]
    }
    
    getData() {
        return JSON.parse(JSON.stringify(this._data))
    }
    
    fill(token = null) {
        for (let i = 0; i < this.x; i++)
            for (let j = 0; j < this.y; j++)
                this._data[j * this.x + i] = token instanceof Function ? token() : token
    }
    
    merge(grid, cb) {
        if (this.x !== grid?.x || this.y !== grid?.y)
            throw new RangeError('Cannot merge different size maps')
        
        for (let i = 0; i < this.x; i++)
            for (let j = 0; j < this.y; j++)
                this._data[j * this.x + i] = cb(
            this._data[j * this.x + i],
            grid._data[j * this.x + i]
        )
        
        return this
    }
    
    traverse(cb) {
        let toKill = false
        const kill = () => (toKill = true)
        
        for (let j = 0; j < this.y; j++)
            for (let i = 0; i < this.x; i++) {
            cb(this._data[j * this.x + i], i, j, kill)
            if (toKill) return
        }
    }
    
    traverseNotNull(cb) {
        let toKill = false
        const kill = () => (toKill = true)
        
        for (let j = 0; j < this.y; j++)
            for (let i = 0; i < this.x; i++) {
            const value = this._data[j * this.x + i]
            if (value !== null) cb(value, i, j, kill)
                if (toKill) return
        }
    }
    
    traverseReverse(cb) {
        let toKill = false
        const kill = () => (toKill = true)
        
        for (let j = this.y - 1; j >= 0; j--)
            for (let i = this.x - 1; i >= 0; i--) {
            cb(this._data[j * this.x + i], i, j, kill)
            if (toKill) return
        }
    }
    
    traverseSnake(cb) {
        let toKill = false
        const kill = () => (toKill = true)
        
        for (let j = this.y - 1; j >= 0; j--)
            if (j % 2)
                for (let i = this.x; i >= 0; i--) {
            cb(this._data[j * this.x + i], i, j, kill)
            if (toKill) return
        }
        else
        for (let i = 0; i < this.x; i++) {
            cb(this._data[j * this.x + i], i, j, kill)
            if (toKill) return
        }
    }
    
    traverseArea(x, y, w, h, cb) {
        x = max(0, min(this.x, floor(x)))
        y = max(0, min(this.y, floor(y)))
        w = max(0, min(this.x, floor(w)))
        h = max(0, min(this.y, floor(h)))
        if (w <= 0 || h <= 0) return
        
        let toKill = false
        const kill = () => (toKill = true)
        
        for (let i = x; i < x + w; i++)
            for (let j = y; j < y + h; j++) {
            cb(this._data[j * this.x + i], i, j, kill)
            if (toKill) return
        }
    }
    
    traverseAreaReverse(x, y, w, h, cb) {
        x = max(0, min(this.x, floor(x)))
        y = max(0, min(this.y, floor(y)))
        w = max(0, min(this.x, floor(w)))
        h = max(0, min(this.y, floor(h)))
        if (w <= 0 || h <= 0) return
        
        let toKill = false
        const kill = () => (toKill = true)
        
        for (let j = y; j < y + h; j++)
            for (let i = x; i < x + w; i++) {
            cb(this._data[j * this.x + i], i, j, kill)
            if (toKill) return
        }
    }
    
    async traverseAsync(cb) {
        let toKill = false
        const kill = () => (toKill = true)
        
        for (let j = 0; j < this.y; j++)
            for (let i = 0; i < this.x; i++) {
            await cb(this._data[j * this.x + i], i, j, kill)
            if (toKill) return
        }
    }
    
    async traverseReverseAsync(cb) {
        let toKill = false
        const kill = () => (toKill = true)
        
        for (let j = this.y - 1; j >= 0; j--)
            for (let i = this.x - 1; i >= 0; i--) {
            await cb(this._data[j * this.x + i], i, j, kill)
            if (toKill) return
        }
    }
    
    // TODO: Need more testing
    async traverseAllAsync(cb) {
        const promises = []
        for (let j = 0; j < this.y; j++)
            for (let i = 0; i < this.x; i++)
                promises.push(cb(this._data[j * this.x + i], i, j))
        return promiseAll(promises)
    }
    
    map(cb) {
        const that = new Grid2D(this.x, this.y)
        for (let j = 0; j < this.y; j++)
            for (let i = 0; i < this.x; i++)
                that._data[j * this.x + i] = cb(this._data[j * this.x + i], i, j)
        return that
    }
    
    filter(cb) {
        const that = new Grid2D(this.x, this.y)
        for (let j = 0; j < this.y; j++)
            for (let i = 0; i < this.x; i++) {
            const value = this._data[j * this.x + i]
            that._data[j * this.x + i] = cb(value, i, j) ? value : null
        }
        return that
    }
    
    mask(gMask, empty = null) {
        return this.merge(gMask, (t1, t2) => (t2 ? t1 : empty))
    }
    
    flat() {
        return this.getArea1D(0, 0, this.x, this.y)
    }
    
    toArray2D() {
        return arrChunkify(this._data, this.x)
    }
    
    copy() {
        const map = new Grid2D(this.x, this.y)
        this.traverse((token, x, y) => (map._data[y * this.x + x] = token))
        return map
    }
    
    copyJSON() {
        const map = new Grid2D(this.x, this.y)
        map._data = jsonParse(jsonStringify(this._data))
        return map
    }
    
    print() {
        const stringify = col =>
            strPadAround((col?.toString?.() ?? `${col}`).substring(0, 8), 8, ' ')
        
        console.log(
            arrChunkify(this._data, this.x)
            .map(row => row.map(stringify).join('|'))
            .join('\n')
        )
    }
    
    *[Symbol.iterator]() {
        for (let i = 0; i < this.x; i++)
            for (let j = 0; j < this.y; j++) yield this._data[j * this.x + i]
    }
}

// MARK: Grid3D
/** 3D grid structure. Helpful when handling 3D grided data. Note: Not as complete as sMap2D */
class Grid3D {
    /**
    * @param x - X size of the map (width)
    * @param y - Y size of the map (height)
    * @param z - Z size of the map (height)
    * @param token - Value to fill the map with. If token is a Function, it will be called for each cell in the map
    */
    constructor(x, y, z, token = null) {
        this.x = x
        this.y = y
        this.z = z
        this._data = new Array(x * y * z)
        .fill(0)
        .map(() => (token instanceof Function ? token() : token))
    }
    
    isValid(x, y, z) {
        return x >= 0 && y >= 0 && z >= 0 && x < this.x && y < this.y && z < this.z
    }
    
    getUnsafe(x, y, z) {
        return this._data[z * this.x * this.y + y * this.x + x]
    }
    
    getSafe(x, y, z) {
        x = floor(x)
        y = floor(y)
        z = floor(z)
        if (x < 0 || y < 0 || z < 0 || x >= this.x || y >= this.y || z >= this.z)
            return null
        return this._data[z * this.x * this.y + y * this.x + x]
    }
    
    get(x, y, z) {
        if (x < 0 || y < 0 || z < 0 || x >= this.x || y >= this.y || z >= this.z)
            return null
        return this._data[z * this.x * this.y + y * this.x + x]
    }
    
    getArea1D(x, y, z, w, h, l) {
        x = max(0, min(this.x, floor(x)))
        y = max(0, min(this.y, floor(y)))
        z = max(0, min(this.z, floor(z)))
        w = max(0, min(this.x, floor(w)))
        h = max(0, min(this.y, floor(h)))
        l = max(0, min(this.z, floor(l)))
        if (w <= 0 || h <= 0 || z <= 0) return []
        const ret = []
        
        for (let i = x; i < x + w; i++)
            for (let j = y; j < y + h; j++)
                for (let k = z; k < z + l; k++) ret.push(this.get(i, j, k))
                    
        return ret
    }
    
    getArea3D(x, y, z, w, h, l) {
        x = max(0, min(this.x, floor(x)))
        y = max(0, min(this.y, floor(y)))
        z = max(0, min(this.z, floor(z)))
        w = max(0, min(this.x, floor(w)))
        h = max(0, min(this.y, floor(h)))
        l = max(0, min(this.z, floor(l)))
        if (w <= 0 || h <= 0 || l <= 0) return new Grid3D(0, 0, 0, null)
            const ret = new Grid3D(w, h, l)
        
        for (let i = x; i < x + w; i++)
            for (let j = y; j < y + h; j++)
                for (let k = z; k < z + l; k++)
                    ret.set(i - x, j - y, k - z, this.get(i, j, k))
        
        return ret._data
    }
    
    setArea(x, y, z, w, h, l, token = null) {
        x = max(0, min(this.x, floor(x)))
        y = max(0, min(this.y, floor(y)))
        z = max(0, min(this.z, floor(z)))
        w = max(0, min(this.x, floor(w)))
        h = max(0, min(this.y, floor(h)))
        l = max(0, min(this.z, floor(l)))
        if (w <= 0 || h <= 0) return null
        
        for (let i = x; i < x + w; i++)
            for (let j = y; j < y + h; j++)
                for (let k = z; k < z + l; k++) this.set(i, j, k, token)
                }
    
    setDirect(x, y, z, token = null) {
        return (this._data[z * this.x * this.y + y * this.x + x] = token)
    }
    
    setUnsafe(x, y, z, token = null) {
        return (this._data[z * this.x * this.y + y * this.x + x] = token instanceof Function ? token() : token)
    }
    
    set(x, y, z, token = null) {
        x = floor(x)
        y = floor(y)
        z = floor(z)
        if (!this.isValid(x, y, z)) return null
        return (this._data[z * this.x * this.y + y * this.x + x] = token instanceof Function ? token() : token)
    }
    
    fill(token = null) {
        for (let k = 0; k < this.z; k++)
            for (let j = 0; j < this.y; j++)
                for (let i = 0; i < this.x; i++)
                    this._data[k * this.x * this.y + j * this.x + i] =
        token instanceof Function ? token() : token
    }
    
    merge(grid, cb) {
        if (this.x !== grid?.x || this.y !== grid?.y || this.z !== grid?.z)
            throw new Error('Cannot merge different size maps')
        
        for (let k = 0; k < this.z; k++)
            for (let j = 0; j < this.y; j++)
                for (let i = 0; i < this.x; i++)
                    this._data[k * this.x * this.y + j * this.x + i] = cb(
            this.getUnsafe(i, j, k),
            grid.getUnsafe(i, j, k)
        )
    }
    
    traverse(cb) {
        let toKill = false
        const kill = () => (toKill = true)
        
        for (let k = 0; k < this.z; k++)
            for (let j = 0; j < this.y; j++)
                for (let i = 0; i < this.x; i++) {
            cb(this._data[k * this.x * this.y + j * this.x + i], i, j, k, kill)
            if (toKill) return
        }
    }
    
    traverseReverse(cb) {
        let toKill = false
        const kill = () => (toKill = true)
        
        for (let k = this.z - 1; k >= 0; k--)
            for (let j = this.y - 1; j >= 0; j--)
                for (let i = this.x - 1; i >= 0; i--) {
            cb(this._data[k * this.x * this.y + j * this.x + i], i, j, k, kill)
            if (toKill) return
        }
    }
    
    async traverseAsync(cb) {
        let toKill = false
        const kill = () => (toKill = true)
        
        for (let k = 0; k < this.z; k++)
            for (let j = 0; j < this.y; j++)
                for (let i = 0; i < this.x; i++) {
            await cb(
                this._data[k * this.x * this.y + j * this.x + i],
                i,
                j,
                k,
                kill
            )
            if (toKill) return
        }
    }
    
    async traverseReverseAsync(cb) {
        let toKill = false
        const kill = () => (toKill = true)
        
        for (let k = this.z - 1; k >= 0; k--)
            for (let j = this.y - 1; j >= 0; j--)
                for (let i = this.x - 1; i >= 0; i--) {
            await cb(
                this._data[k * this.x * this.y + j * this.x + i],
                i,
                j,
                k,
                kill
            )
            if (toKill) return
        }
    }
    
    // TODO: Need more testing
    async traverseAllAsync(cb) {
        const promises = []
        for (let k = 0; k < this.z; k++)
            for (let j = 0; j < this.y; j++)
                for (let i = 0; i < this.x; i++)
                    promises.push(
            cb(this._data[k * this.x * this.y + j * this.x + i], i, j, k)
        )
        return promiseAll(promises)
    }
    
    map(cb) {
        for (let k = 0; k < this.z; k++)
            for (let j = 0; j < this.y; j++)
                for (let i = 0; i < this.x; i++)
                    this._data[k * this.x * this.y + j * this.x + i] = cb(
            this._data[k * this.x * this.y + j * this.x + i],
            i,
            j,
            k
        )
        return this
    }
    
    filter(cb) {
        for (let j = 0; j < this.y; j++)
            for (let i = 0; i < this.x; i++)
                for (let k = 0; k < this.z; k++) {
            const value = this._data[k * this.x * this.y + j * this.x + i]
            this._data[k * this.x * this.y + j * this.x + i] = cb(value, i, j, k)
            ? value
            : null
        }
        return this
    }
    
    flat() {
        return this.getArea1D(0, 0, 0, this.x, this.y, this.z)
    }
    
    toArray3D() {
        const arr = []
        for (let k = 0; k < this.z; k++) {
            arr[k] = []
            for (let j = 0; j < this.y; j++) {
                arr[k][j] = []
                for (let i = 0; i < this.x; i++)
                    arr[k][j][i] = this._data[k * this.x * this.y + j * this.x + i]
            }
        }
        return arr
    }
    
    copy() {
        const map = new Grid3D(this.x, this.y, this.z)
        this.traverse(
            (cell, x, y, z) =>
                (map._data[z * this.x * this.y + y * this.x + x] = cell)
        )
        return map
    }
    
    *[Symbol.iterator]() {
        for (let k = 0; k < this.z; k++)
            for (let j = 0; j < this.y; j++)
                for (let i = 0; i < this.x; i++)
                    yield this._data[k * this.x * this.y + j * this.x + i]
    }
}

// MARK: HeuristicList
class HeuristicList {
    constructor() {
        this.items = []
    }
    
    get length() {
        return this.items.length
    }
    
    // GPT-assisted
    push(item, heuristic = 0) {
        const index = this.items.findIndex(other => heuristic > other.heuristic)
        if (index === -1)
            this.items.push({
            item,
            heuristic
        })
        else this.items.splice(index, 0, { item, heuristic })
    }
    
    get(i) {
        return this.items[(i + this.items.length) % this.items.length]
    }
    
    has(item) {
        return this.items.includes(item)
    }
    
    delete(item) {
        const index = this.items.indexOf(item)
        if (index !== -1) this.items.splice(index, 1)
        }
    
    high() {
        return this.items[0]
    }
    
    low() {
        return this.items[this.items.length - 1]
    }
    
    popIndex(i) {
        return this.items.splice(i, 1)[0]
    }
    
    popHigh() {
        return this.items.shift()
    }
    
    popLow() {
        return this.items.pop()
    }
}

// MARK: StateMachine
class StateMachineState {
    constructor(name) {
        this.name = name ?? this.constructor.name
        this.owner = null
        this.initialized = false
    }
    
    async onInit(data) {}
    async onStart(data) {}
    async onEnd() {}
    onUpdate(dt) {}
    onRender() {}
}

/** Creates a State Machine. Useful for games and animations */
class StateMachine {
    currentState = null
    
    _swappingStates = false
    _afterSwap = null
    
    constructor() {
        this.states = new Map()
    }
    
    addState(state) {
        if (isArray(state)) {
            for (let s of state) {
                s.owner = this
                this.states.set(s.name, s)
            }
            return
        }
        
        state.owner = this
        this.states.set(state.name, state)
    }
    
    async run(name = '', initData = {}, startData = {}) {
        try {
            if (this._swappingStates)
                return (this._afterSwap = [name, initData, startData])
            
            this._swappingStates = true
            
            if (this.currentState) await this.stop()
                const state = this.states.get(name)
            if (!state) throw new EvalError(`State [${name}] not found.`)
                this.currentState = this.states.get('__loading__')
            
            if (!state.initialized) {
                await state.onInit(initData)
                state.initialized = true
            }
            
            this.currentState = state
            await state.onStart(startData)
            
            if (this._afterSwap) {
                const args = [...this._afterSwap]
                this._swappingStates = false
                this._afterSwap = null
                await this.run(...args)
            }
        } catch (err) {
            console.error('Could not swap to state [' + name + '].', err)
        }
        
        this._swappingStates = false
    }
    
    async stop() {
        if (this.currentState) await this.currentState.onEnd()
            this.currentState = null
    }
    
    update(dt) {
        const state = this.currentState
        if (!state) return
        state.onUpdate(dt)
    }
    
    render() {
        const state = this.currentState
        if (!state) return
        state.onRender()
    }
}

// MARK: Roll
/** Rolls an array and stores the value of the current item. Helpful when creating animations */
class Roll {
    /**
    * @param items - Array to be `rolled`
    * @param mode - What to do when the last item is rolled
    */
    constructor(items, mode = 'reset', startIndex = 0) {
        this.items = items
        this.mode = mode
        this.startIndex = startIndex
        this._i = startIndex
        this._dir = 1
        this._value = items[startIndex]
    }
    
    get value() {
        return this._value
    }
    
    refresh() {
        if (this._i < 0 || this._i >= this.items.length) {
            if (this.mode === 'bounce') {
                this._i += 2 * (this._dir *= -1)
            } else if (this.mode === 'reset') {
                this._i = (this._i + this.items.length) % this.items.length
            }
        }
        
        this._value = this.items[this._i]
    }
    
    reverse() {
        this._dir *= -1
    }
    
    next() {
        this.setIndex(++this._i)
    }
    
    prev() {
        this.setIndex(--this._i)
    }
    
    setIndex(index) {
        this._i = index
        this.refresh()
    }
}

// MARK: Vec2D
/** 2D vector with X and Y components. Very slow: If you need performance, use vec() with vec functions instead */
class Vec2D {
    /**
    * @param x - X component of the vector
    * @param y - Y component of the vector
    */
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }
    
    static get UP() {
        return new Vec2D(0, -1)
    }
    static get DOWN() {
        return new Vec2D(0, 1)
    }
    static get LEFT() {
        return new Vec2D(-1, 0)
    }
    static get RIGHT() {
        return new Vec2D(1, 0)
    }
    static get CENTER() {
        return new Vec2D(0.5, 0.5)
    }
    
    static rand(minX = -1, maxX = 1, minY = -1, maxY = 1) {
        return new Vec2D(
            random() * (maxX - minX) + minX,
            random() * (maxY - minY) + minY
        )
    }
    
    static randPolar(minMag = 1, maxMag = 1) {
        let x, y
        do {
            x = random()
            y = random()
        } while (x * x + y * y > 1)
            return new Vec2D(x, y).mult(random() * (maxMag - minMag) + minMag)
    }
    
    static fromPolar(angle, mag = 1) {
        return new Vec2D(cos(angle) * mag, -sin(angle) * mag)
    }
    
    static add(v1, v2) {
        return new Vec2D(v1.x + v2.x, v1.y + v2.y)
    }
    
    static sub(v1, v2) {
        return new Vec2D(v1.x - v2.x, v1.y - v2.y)
    }
    
    static mult(v, s) {
        return new Vec2D(v.x * s, v.y * s)
    }
    
    static div(v, s) {
        return new Vec2D(v.x / s, v.y / s)
    }
    
    static had(v1, v2) {
        return new Vec2D(v1.x * v2.x, v1.y * v2.y)
    }
    
    static unit(v) {
        const sum = abs(v.x) + abs(v.y)
        const v2 = new Vec2D(v.x, v.y)
        if (sum === 0 || sum === 1) return v2
        return v2.div(v2.mag())
    }
    
    static invert(v) {
        return new Vec2D(-v.x, -v.y)
    }
    
    static rotate(v, a) {
        return Vec2D.fromPolar(vecHeading([v.x, v.y]) + a, vecMag([v.x, v.y]))
    }
    
    static apply(v, f) {
        return new Vec2D(f(v.x), f(v.y))
    }
    
    static limit(v, max) {
        return vecMag2([v.x, v.y]) > max * max
        ? new Vec2D(v.x, v.y).setMag(max)
        : new Vec2D(v.x, v.y)
    }
    
    static limitSmooth(v, max, t) {
        const m = vecMag([v.x, v.y])
        return m > max
        ? new Vec2D(v.x, v.y).setMag(m + (max - m) * t)
        : new Vec2D(v.x, v.y)
    }
    
    static clamp(v, minX, maxX, minY, maxY) {
        return new Vec2D(min(max(v.x, minX), maxX), min(max(v.y, minY), maxY))
    }
    
    static lerp(v1, v2, t) {
        return new Vec2D(v2.x + (v1.x - v2.x) * t, v2.y + (v1.y - v2.y) * t)
    }
    
    static lerpVec(v1, v2, vT) {
        return new Vec2D(v2.x + (v1.x - v2.x) * vT.x, v2.y + (v1.y - v2.y) * vT.y)
    }
    
    static lerpSmooth(v1, v2, t) {
        const v1h = vecHeading([v1.x, v1.y])
        const v1m = vecHeading([v1.x, v1.y])
        const angle = v1h + (vecHeading([v2.x, v2.y]) - v1h) * t
        const v3 = Vec2D.fromPolar(angle, v1m + (vecMag([v2.x, v2.y]) - v1m) * t)
        return new Vec2D(v3.x, -v3.y)
    }
    
    static mag(v) {
        return sqrt(v.x * v.x + v.y * v.y)
    }
    
    static mag2(v) {
        return v.x * v.x + v.y * v.y
    }
    
    static dist(v1, v2) {
        return hypot(v1.x - v2.x, v1.y - v2.y)
    }
    
    static dist2(v1, v2) {
        return (v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y)
    }
    
    static pointTo(v1, v2) {
        return new Vec2D(v1.x, v1.y).pointTo(v2)
    }
    
    get 0() {
        return this.x
    }
    
    get 1() {
        return this.y
    }
    
    set 0(v) {
        this.x = v
    }
    
    set 1(v) {
        this.y = v
    }
    
    get length() {
        return this.mag()
    }
    
    get xy() {
        return new Vec2D(this.x, this.y)
    }
    
    get yx() {
        return new Vec2D(this.y, this.x)
    }
    
    zero() {
        this.x = 0
        this.y = 0
        return this
    }
    
    right() {
        return new Vec2D(-this.y, this.x)
    }
    
    left() {
        return new Vec2D(this.y, -this.x)
    }
    
    down() {
        return this.invert()
    }
    
    copy() {
        return new Vec2D(this.x, this.y)
    }
    
    normal() {
        return new Vec2D(-this.y, this.x)
    }
    
    cross(v) {
        return this.x * v.y - v.x * this.y
    }
    
    dot(v) {
        return this.x * v.x + this.y * v.y
    }
    
    // https://en.wikipedia.org/wiki/Hadamard_product_%28matrices%29
    had(v) {
        return new Vec2D(this.x * v.x, this.y * v.y)
    }
    
    set(x, y) {
        if (arguments.length === 1) {
            this.x = x.x
            this.y = x.y
        } else {
            this.x = x
            this.y = y
        }
        return this
    }
    
    mask(x = 0, y = 0) {
        return new Vec2D(+!!x * this.x, +!!y * this.y)
    }
    
    add(v) {
        this.x += v.x
        this.y += v.y
        return this
    }
    
    sub(v) {
        this.x -= v.x
        this.y -= v.y
        return this
    }
    
    mult(s) {
        this.x *= s
        this.y *= s
        return this
    }
    
    div(s) {
        this.x /= s
        this.y /= s
        return this
    }
    
    mag() {
        return hypot(this.x, this.y)
    }
    
    mag2() {
        return this.x * this.x + this.y * this.y
    }
    
    setMag(m) {
        return this.unit().mult(m)
    }
    
    pointTo(v) {
        const angle = -atan2(v.y - this.y, v.x - this.x)
        this.x = cos(angle)
        this.y = -sin(angle)
        return this
    }
    
    unit() {
        const sum = abs(this.x) + abs(this.y)
        if (sum === 0 || sum === 1) return this
        return this.div(this.mag())
    }
    
    invert() {
        this.x = -this.x
        this.y = -this.y
        return this
    }
    
    rotate(a) {
        const fa = Vec2D.fromPolar(this.heading() + a, this.mag())
        this.x = fa.x
        this.y = fa.y
        return this
    }
    
    apply(f) {
        this.x = f(this.x)
        this.y = f(this.y)
        return this
    }
    
    heading() {
        return atan2(this.y, this.x)
    }
    
    limit(max) {
        return this.mag2() > max * max ? this.setMag(max) : this
    }
    
    limitSmooth(max, t) {
        const m = this.mag()
        return m > max ? this.setMag(m + (max - m) * t) : this
    }
    
    clamp(minX, maxX, minY, maxY) {
        this.x = min(max(this.x, minX), maxX)
        this.y = min(max(this.y, minY), maxY)
        return this
    }
    
    lerp(v, t) {
        this.x = this.x + (v.x - this.x) * t
        this.y = this.y + (v.y - this.y) * t
        return this
    }
    
    lerpVec(v, vT) {
        this.x = this.x + (v.x - this.x) * vT.x
        this.y = this.y + (v.y - this.y) * vT.y
        return this
    }
    
    lerpSmooth(v, t) {
        const v1h = this.heading()
        const v1m = this.mag()
        const angle = v1h + (vecHeading([v.x, v.y]) - v1h) * t
        const v2 = Vec2D.fromPolar(angle, v1m + (vecMag([v.x, v.y]) - v1m) * t)
        this.x = v2.x
        this.y = -v2.y
        return this
    }
    
    dist(v) {
        return hypot(this.x - v.x, this.y - v.y)
    }
    
    dist2(v) {
        return (this.x - v.x) ** 2 + (this.y - v.y) ** 2
    }
    
    toString() {
        return '{x:' + this.x + ',y:' + this.y + '}'
    }
    
    *[Symbol.iterator]() {
        yield this.x
        yield this.y
    }
}

// MARK: VecND
/** ND vector with X, Y, Z ... N components */
class VecND {
    /**
    * @param dim - Dimensions of the Vector
    */
    constructor(...dim) {
        this.dim = isArray(dim[0]) ? dim[0] : dim
    }
    
    static fromArray(dim) {
        const v = new VecND(0)
        v.set(dim)
        return v
    }
    
    static rand(minX = -1, maxX = 1, minY = -1, maxY = 1) {
        return new Vec2D(
            random() * (maxX - minX) + minX,
            random() * (maxY - minY) + minY
        )
    }
    
    static add(v1, v2) {
        return v1.copy().add(v2)
    }
    
    static sub(v1, v2) {
        return v1.copy().sub(v2)
    }
    
    static mult(v, s) {
        return v.copy().mult(s)
    }
    
    static div(v, s) {
        return v.copy().div(s)
    }
    
    static had(v1, v2) {
        return v1.copy().had(v2)
    }
    
    // TODO: Improve
    static unit(v) {
        // const sum = _MAbs(v.x) + _MAbs(v.y)
        // if (sum === 0 || sum === 1) return v.copy()
        return v.copy().unit()
    }
    
    static invert(v) {
        return v.copy().invert()
    }
    
    static apply(v, f) {
        return v.copy().apply(f)
    }
    
    // TODO: Improve
    static limit(v, max) {
        // return v.mag2() > max * max ? v.copy().setMag(max) : v.copy()
        return v.copy().limit(max)
    }
    
    // TODO: To write
    static limitSmooth(v, max, t) {
        const m = v.mag()
        return m > max ? v.copy().setMag(m + (max - m) * t) : v.copy()
    }
    
    // TODO: To write
    static clamp(v, minX, maxX, minY, maxY) {
        return new Vec2D(min(max(v.x, minX), maxX), min(max(v.y, minY), maxY))
    }
    
    // TODO: To write
    static lerp(v1, v2, t) {
        return new Vec2D(v2.x + (v1.x - v2.x) * t, v2.y + (v1.y - v2.y) * t)
    }
    
    // TODO: To write
    static lerpVec(v1, v2, vT) {
        return new Vec2D(v2.x + (v1.x - v2.x) * vT.x, v2.y + (v1.y - v2.y) * vT.y)
    }
    
    get 0() {
        return this.x
    }
    
    get 1() {
        return this.y
    }
    
    get 3() {
        return this.z
    }
    
    get 4() {
        return this.w
    }
    
    set 0(v) {
        this.x = v
    }
    
    set 1(v) {
        this.y = v
    }
    
    set 3(v) {
        this.z = v
    }
    
    set 4(v) {
        this.w = v
    }
    
    get x() {
        return this.dim[0] || 0
    }
    
    get y() {
        return this.dim[1] || 0
    }
    
    get z() {
        return this.dim[2] || 0
    }
    
    get w() {
        return this.dim[3] || 0
    }
    
    set x(v) {
        this.setD(0, v)
    }
    
    set y(v) {
        this.setD(1, v)
    }
    
    set z(v) {
        this.setD(2, v)
    }
    
    set w(v) {
        this.setD(3, v)
    }
    
    get length() {
        return this.mag()
    }
    
    getD(i) {
        return this.dim[i] || 0
    }
    
    setD(i, v) {
        if (--i !== 0 && this.dim[i] === undefined) this.setD(i, 0)
            this.dim[i] = v
    }
    
    zero() {
        for (let i = 0; i < this.dim.length; i++) {
            this.dim[i] = 0
        }
        
        return this
    }
    
    copy() {
        return VecND.fromArray(this.dim)
    }
    
    dot(v) {
        let sum = 0
        const m = max(this.dim.length, v.dim.length)
        
        for (let i = 0; i < m; i++) {
            sum += this.getD(i) * v.getD(i)
        }
        
        return sum
    }
    
    // https://en.wikipedia.org/wiki/Hadamard_product_%28matrices%29
    had(v) {
        const m = max(this.dim.length, v.dim.length)
        
        for (let i = 0; i < m; i++) {
            this.dim[0] = this.getD(i) * v.getD(i)
        }
        
        return this
    }
    
    set(dim) {
        for (let i = 0; i < dim.length; i++) {
            this.setD(i, dim[i])
        }
        return this
    }
    
    mask(dim) {
        for (let i = 0; i < this.dim.length; i++) {
            this.setD(i, this.dim[i] * +!!dim[i])
        }
        return this
    }
    
    add(v) {
        const m = max(this.dim.length, v.dim.length)
        
        for (let i = 0; i < m; i++) {
            this.setD(i, this.getD(i) + v.getD(i))
        }
        
        return this
    }
    
    sub(v) {
        const m = max(this.dim.length, v.dim.length)
        
        for (let i = 0; i < m; i++) {
            this.setD(i, this.getD(i) - v.getD(i))
        }
        
        return this
    }
    
    mult(s) {
        for (let i = 0; i < this.dim.length; i++) {
            this.setD(i, this.dim[i] * s)
        }
        return this
    }
    
    div(s) {
        for (let i = 0; i < this.dim.length; i++) {
            this.setD(i, this.dim[i] / s)
        }
        
        return this
    }
    
    mag() {
        return hypot(...this.dim)
    }
    
    mag2() {
        return this.dot(this)
    }
    
    setMag(m) {
        return this.unit().mult(m)
    }
    
    unit() {
        const sum = mathSum(this.dim.map(x => abs(x)))
        if (sum === 0 || sum === 1) return this
        return this.div(this.mag())
    }
    
    invert() {
        for (let i = 0; i < this.dim.length; i++) {
            this.setD(i, -this.dim[i])
        }
        return this
    }
    
    apply(f) {
        for (let i = 0; i < this.dim.length; i++) {
            this.setD(i, f(this.dim[i]))
        }
        
        return this
    }
    
    limit(max = 1) {
        return this.mag2() > max * max ? this.setMag(max) : this
    }
    
    limitSmooth(max = 1, t = 0.5) {
        const m = this.mag()
        return m > max ? this.setMag(m + (max - m) * t) : this
    }
    
    clamp(minMaxes) {
        for (let i = 0; i < minMaxes.length; i++) {
            this.setD(i, min(max(this.getD(i), minMaxes[i][0]), minMaxes[i][1]))
        }
        
        return this
    }
    
    lerp(v, t = 0.5) {
        const m = max(this.dim.length, v.dim.length)
        
        for (let i = 0; i < m; i++) {
            const d = this.getD(i)
            this.setD(i, d + (v.getD(i) - d) * t)
        }
        
        return this
    }
    
    lerpVec(v, vT) {
        const m = max(this.dim.length, v.dim.length)
        
        for (let i = 0; i < m; i++) {
            const d = this.getD(i)
            this.setD(i, d + (v.getD(i) - d) * vT.getD(i))
        }
        
        return this
    }
    
    dist(v) {
        let sum = 0
        const m = max(this.dim.length, v.dim.length)
        
        for (let i = 0; i < m; i++) {
            sum += (this.getD(i) - v.getD(i)) ** 2
        }
        
        return sqrt(sum)
    }
    
    dist2(v) {
        let sum = 0
        const m = max(this.dim.length, v.dim.length)
        
        for (let i = 0; i < m; i++) {
            sum += (this.getD(i) - v.getD(i)) ** 2
        }
        
        return sum
    }
    
    toString() {
        let str = '{'
        const max = this.dim.length
        
        for (let i = 0; i < max; i++) {
            str +=
            (i < 4 ? 'xyzw'[i] : i) + ':' + this.dim[i] + (i < max - 1 ? ',' : '')
        }
        
        return str + '}'
    }
    
    *[Symbol.iterator]() {
        for (let i = 0; i < this.dim.length; i++) {
            yield this.dim[i]
        }
    }
}

// MARK: CellularAutomata
class CellularAutomata {
    _cells = []
    
    // TODO: Doc me
    constructor(w, h, ratio) {
        this.w = w
        this.h = h
        
        for (let i = 0; i < w * h; i++) {
            this._cells.push(+(random() < ratio))
        }
    }
    
    toGrid2D() {
        const grid = new Grid2D(0, 0, 0)
        grid.x = this.w
        grid.y = this.h
        grid.putData(this._cells.slice())
        return grid
    }
    
    copy() {
        const copy = new CellularAutomata(this.w, this.h, 0)
        
        for (let y = 0; y < this.h; y++) {
            for (let x = 0; x < this.w; x++) {
                copy.set(x, y, this.get(x, y))
            }
        }
        
        return copy
    }
    
    get(x, y) {
        if (x < 0 || y < 0 || x >= this.w || y >= this.h) return 0
        return this._cells[y * this.w + x]
    }
    
    set(x, y, state) {
        if (x < 0 || y < 0 || x >= this.w || y >= this.h)
            throw new RangeError('Coordinates out of bounds.')
        this._cells[y * this.w + x] = +!!state
    }
    
    merge(automata, callback) {
        if (automata.w !== this.w || automata.h !== this.h)
            throw new RangeError('Automata sizes must be the same for merging.')
        const w = this.w
        
        for (const [x, y] of this) {
            this._cells[y * w + x] = callback(
                this._cells[y * w + x],
                automata.get(x, y)
            )
        }
    }
    
    simulate(rules, iterations = 1) {
        const cells = this._cells
        const w = this.w
        const h = this.h
        
        for (let i = 0; i < iterations; i++) {
            const pCells = []
            
            for (const cell of cells) {
                pCells.push(cell)
            }
            
            for (const [x, y] of this) {
                const up = (y - 1) * w
                const nCount =
                (x === 0 || y === 0 ? 0 : pCells[up + x - 1]) +
                (y === 0 ? 0 : pCells[up + x]) +
                (x === w - 1 || y === 0 ? 0 : pCells[up + x + 1]) +
                (x === 0 || y === h - 1 ? 0 : pCells[up + w + w + x - 1]) +
                (y === h - 1 ? 0 : pCells[up + w + w + x]) +
                (x === w - 1 || y === h - 1 ? 0 : pCells[up + w + w + x + 1]) +
                (x === 0 ? 0 : pCells[up + w + x - 1]) +
                (x === w - 1 ? 0 : pCells[up + w + x + 1])
                
                cells[y * w + x] = +(
                    random() < rules[nCount + +(cells[y * w + x] > 0.5) * 9]
                )
            }
        }
    }
    
    *[Symbol.iterator]() {
        const w = this.w
        const h = this.h
        
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                yield [x, y]
            }
        }
    }
}

// MARK: WaveFunctionCollapse
// TODO: Rewrite
class WaveFunctionCollapse {
    grid = new Grid2D(0, 0, null)
    
    _states = []
    _spots = []
    _initStates = []
    
    lookInsideSpot(spot, dir, possible, canBe) {
        const nStates = this._states.find(x => x.tile === spot.tile)?.[dir]
        
        if (!nStates) return []
        
        const formatted = nStates.map(x => {
            // Handle different formats
            if (Array.isArray(x)) return { value: x[0], weight: x[1] ?? 1 }
            if (typeof x === 'string') return { value: x, weight: 1 }
            return { value: x.value, weight: x.weight }
        })
        
        const filtered = formatted.filter(x => canBe.includes(x.value))
        const asTiles = filtered.map(x => x.value)
        
        for (const x of canBe) {
            if (!asTiles.includes(x)) canBe.splice(canBe.indexOf(x), 1)
                
            const index = possible.map(x => x.value).indexOf(x)
            if (index !== -1) possible.splice(index, 1)
            }
        
        return filtered
    }
    
    spot(x, y) {
        return { x, y, tile: -1, collapsed: false }
    }
    
    allStates() {
        return this._states.map(x => x.tile)
    }
    
    init(w, h) {
        this._spots = []
        this.grid = new Grid2D(w, h, null)
        this.grid.map((t, x, y) => {
            const spot = this.spot(x, y)
            this._spots.push(spot)
            return spot
        })
    }
    
    collapse(keepCollapsing = false, spot) {
        if (!this.grid)
            throw new Error('Method init must be called before collapsing.')
        if (this._spots.length === 0) return
        
        // Grab a random spot and remove it from the pool
        if (!spot) spot = randItem(this._spots)
            this._spots.splice(this._spots.indexOf(spot), 1)
        if (spot.collapsed) {
            this.collapse(keepCollapsing)
            return
        }
        
        // Build possibility pool
        const possible = []
        const canBe = this.allStates()
        const validNeighbors = []
        
        const sUp = this.grid.get(spot.x, spot.y - 1)
        const sLeft = this.grid.get(spot.x - 1, spot.y)
        const sDown = this.grid.get(spot.x, spot.y + 1)
        const sRight = this.grid.get(spot.x + 1, spot.y)
        
        const process = (spot, dir) => {
            if (spot) {
                if (spot.collapsed)
                    possible.push(...this.lookInsideSpot(spot, dir, possible, canBe))
                else validNeighbors.push(spot)
            }
        }
        
        process(sUp, 'down')
        process(sLeft, 'right')
        process(sDown, 'up')
        process(sRight, 'left')
        
        // There's some state to collapse into
        if (possible.length) spot.tile = randWeight(possible)
            // No neighbores were collapsed yet
        else if (canBe.length) spot.tile = randItem(this._initStates)?.tile ?? -2
        // The spot could not be collapsed
        else spot.tile = -2
        
        spot.collapsed = true
        
        if (keepCollapsing) this.collapse(keepCollapsing, randItem(validNeighbors))
        }
    
    addState(tile, top, right, bottom, left, initial = true) {
        const state = {
            tile,
            top,
            right,
            bottom,
            left
        }
        this._states.push(state)
        if (initial) this._initStates.push(state)
        }
    
    print() {
        if (!this.grid) throw new Error('init must be called before print.')
            let string = this.grid
        .toArray2D()
        .map(row =>
            row.map(x => (x?.tile?.toString?.() ?? '-1').padStart(4, ' ')).join('')
        )
        .join('\n\n')
        
        console.log(string)
    }
}

// MARK: RandomWalk
class RandomWalk {
    // TODO: Doc me
    constructor(w, h, step) {
        this.grid = new Grid2D(w, h, 0)
    }
    
    walk(x, y, steps, step) {
        let lastX = x
        let lastY = y
        
        for (let i = 0; i < steps; i++) {
            this.grid.set(x, y, 1)
            if (step && i) {
                const dir =
                lastX > x ? 'right' : lastX < x ? 'left' : lastY > y ? 'down' : 'up'
                
                step(x, y, dir, i)
            }
            lastX = x
            lastY = y
            
            switch (floor(random() * 4)) {
                case 0:
                x--
                break
                case 1:
                y--
                break
                case 2:
                x++
                break
                case 3:
                y++
                break
            }
        }
    }
    
    walkForwards(x, y, steps, step) {
        let lastDir = -1
        
        for (let i = 0; i < steps; i++) {
            this.grid.set(x, y, 1)
            if (step && i) step(x, y, ['left', 'up', 'right', 'down'][lastDir], i)
                
            let dir = floor(random() * 4)
            if (dir === (lastDir + 2) % 4) dir += sign(random() - 0.5)
                dir = (dir + 4) % 4
            lastDir = dir
            
            switch (dir) {
                case 0:
                x--
                break
                case 1:
                y--
                break
                case 2:
                x++
                break
                case 3:
                y++
                break
            }
        }
    }
    
    selfAvoidWalk(x, y, steps, step) {
        let dir = 0
        
        for (let i = 0; i < steps; i++) {
            this.grid.set(x, y, 1)
            if (step && i) step(x, y, ['left', 'up', 'right', 'down'][dir], i)
                
            dir = floor(random() * 4)
            
            const possible = [
                [x - 1, y],
                [x, y - 1],
                [x + 1, y],
                [x, y + 1]
            ]
            
            let take = possible[dir]
            
            for (let i = 0; i < 3; i++) {
                if (this.grid.get(take[0], take[1]) !== 1) break
                take = possible[(dir + i) % 4]
            }
            
            x = take[0]
            y = take[1]
        }
    }
    
    print() {
        let string = this.grid
        .toArray2D()
        .map(row => row.join(' '))
        .join('\n')
        
        console.log(string)
    }
}

// MARK: ParticleSystem
// TODO: Test me
class ParticleSystemParticle {
    constructor(sys) {
        this.sys = sys
        this.x = sys.x
        this.y = sys.y
        this.time = 0
        
        // Randomize position inside 'area'
        if (sys.area.isCircular) {
            let a = randF2(TWO_PI)
            let r = randF2()
            this.x += cos(a) * r * 0.5 * sys.area.width
            this.y += sin(a) * r * 0.5 * sys.area.height
        } else {
            this.x += randF2(sys.area.width - 0.5 * sys.area.width)
            this.y += randF2(sys.area.height - 0.5 * sys.area.height)
        }
        
        // Init offsets
        this._dAngle = randF2(this.sys.angle.variance)
        this._dSpeed = randF2(this.sys.speed.variance)
        this._dWidth = randF2(this.sys.width.variance)
        this._dHeight = randF2(this.sys.height.variance)
        this._dRadius = randF2(this.sys.radius.variance)
        this._dAlpha = randF2(this.sys.alpha.variance)
        this._dFill = randF2(this.sys.fill.variance)
        this._dStroke = randF2(this.sys.stroke.variance)
        this._dLineWidth = randF2(this.sys.lineWidth.variance)
    }
    
    get angle() {
        return (
            this._dAngle +
            mathLerpCurve(
                this.sys.angle.step,
                mathClamp(this.time / this.sys.angle.time, 0, 1)
            )
        )
    }
    
    get speed() {
        return (
            this._dSpeed +
            mathLerpCurve(
                this.sys.speed.step,
                mathClamp(this.time / this.sys.speed.time, 0, 1)
            )
        )
    }
    
    get width() {
        return (
            this._dWidth +
            mathLerpCurve(
                this.sys.width.step,
                mathClamp(this.time / this.sys.width.time, 0, 1)
            )
        )
    }
    
    get height() {
        return (
            this._dHeight +
            mathLerpCurve(
                this.sys.height.step,
                mathClamp(this.time / this.sys.height.time, 0, 1)
            )
        )
    }
    
    get radius() {
        return (
            this._dRadius +
            mathLerpCurve(
                this.sys.radius.step,
                mathClamp(this.time / this.sys.radius.time, 0, 1)
            )
        )
    }
    
    get alpha() {
        return (
            this._dAlpha +
            mathLerpCurve(
                this.sys.alpha.step,
                mathClamp(this.time / this.sys.alpha.time, 0, 1)
            )
        )
    }
    
    get fill() {
        return this.sys.fill.step[0]
        // return this._dFill + mathLerpCurve(this.sys.fill.step, mathClamp(this.time / this.sys.fill.time, 0, 1))
    }
    
    get stroke() {
        return this.sys.stroke.step[0]
        // return this._dStroke + mathLerpCurve(this.sys.stroke.step, mathClamp(this.time / this.sys.stroke.time, 0, 1))
    }
    
    get lineWidth() {
        return (
            this._dLineWidth +
            mathLerpCurve(
                this.sys.lineWidth.step,
                mathClamp(this.time / this.sys.lineWidth.time, 0, 1)
            )
        )
    }
    
    get vx() {
        return cos(this.angle) * this.speed
    }
    
    get vy() {
        return sin(this.angle) * this.speed
    }
}

class ParticleSystem {
    constructor(
        x = 0,
        y = 0,
        {
            area = {
                width: 10,
                height: 10,
                isCircular: false
            },
            delay = 10,
            amount = -1,
            lifespan = { value: 0, variance: 0 },
            angle = { step: [0, 100], time: 100, variance: 0 },
            speed = { step: [0, 100], time: 100, variance: 0 },
            width = { step: [0, 100], time: 100, variance: 0 },
            height = { step: [0, 100], time: 100, variance: 0 },
            radius = { step: [0, 100], time: 100, variance: 0 },
            alpha = { step: [1, 0], time: 100, variance: 0 },
            lineWidth = { step: [0, 1], time: 100, variance: 0 },
            fill = { step: ['#f00', '#00f'], time: 100, variance: 0 },
            stroke = { step: ['#000', '#fff'], time: 100, variance: 0 }
        } = {}
    ) {
        this.x = x
        this.y = y
        this.area = area
        this.delay = delay
        this.lifespan = lifespan
        this.angle = angle
        this.speed = speed
        this.amount = amount
        this.width = width
        this.height = height
        this.radius = radius
        this.alpha = alpha
        this.fill = fill
        this.stroke = stroke
        this.lineWidth = lineWidth
        this.particles = []
        
        timerCreate(delay, () => this.update())
    }
    
    static Particle = ParticleSystemParticle
    
    createParticle() {
        return new ParticleSystemParticle(this)
    }
    
    update() {}
    
    render(ctx) {}
}

// #endregion

// #region 2D Vector math

/** Light weight 2D vector structure */
function vec(x = 0, y = 0) {
    const v = [x, y]
    Object.defineProperty(v, 'x', {
        get() {
            return v[0]
        },
        set(newValue) {
            v[0] = newValue
        }
    })
    Object.defineProperty(v, 'y', {
        get() {
            return v[1]
        },
        set(newValue) {
            v[1] = newValue
        }
    })
    // @ts-ignore
    return v
}

function vecRight(v) {
    return vec(-v[1], v[0])
}

function vecLeft(v) {
    return vec(v[1], -v[0])
}

function vecDown(v) {
    return vec(-v[0], -v[1])
}

function vecCopy(v) {
    return vec(v[0], v[1])
}

function vecNormal(v) {
    return vec(-v[1], v[0])
}

/** Cross product of two vectors */
function vecCross(v1, v2) {
    return v1[0] * v2[1] - v2[0] * v1[1]
}

/** Dot product of two vectors */
function vecDot(v1, v2) {
    return v1[0] * v2[0] + v1[1] * v2[1]
}

// https://en.wikipedia.org/wiki/Hadamard_product_%28matrices%29
/** Hadamard product of two vectors */
function vecHad(v1, v2) {
    return vec(v1[0] * v2[0], v1[1] * v2[1])
}

/** Sets the values of a vector */
function vecSet(v, x, y) {
    v[0] = x
    v[1] = y
}

function vecAdd(v1, v2) {
    return vec(v1[0] + v2[0], v1[1] + v2[1])
}

function vecSub(v1, v2) {
    return vec(v1[0] - v2[0], v1[1] - v2[1])
}

function vecMult(v, s) {
    return vec(v[0] * s, v[1] * s)
}

function vecDiv(v, s) {
    return vec(v[0] / s, v[1] / s)
}

/** Magnitude of the vector */
function vecMag(v) {
    return hypot(v[0], v[1])
}

/** **Squared** magnitude of the vector */
function vecMag2(v) {
    return v[0] * v[0] + v[1] * v[1]
}

/** Returns a new vector with `v`'s direction and magnitude `m` */
function vecSetMag(v, m) {
    return vecMult(vecNormalize(v), m)
}

/** Returns am unit vector pointing towards `v2` from `v1` */
function vecPointTo(v1, v2) {
    const angle = -atan2(v1[0] - v2[0], v1[1] - v2[1])
    return vec(cos(angle), -sin(angle))
}

/** Returns the unit vector with the same direction as `v` */
function vecNormalize(v) {
    const sum = abs(v[0]) + abs(v[1])
    if (sum === 0 || sum === 1) return vec(v[0], v[1])
        return vecDiv(v, vecMag(v))
}

function vecInvert(v) {
    return vec(-v[0], -v[1])
}

/** Creates a vector with the given angle `angle` and magnitude `mag` */
function vecFromAngle(angle, mag = 1) {
    return vec(cos(angle) * mag, -sin(angle) * mag)
}

/** Creates a vector with random components */
function vecRand(minX = -1, minY = -1, maxX = 1, maxY = 1) {
    return vec(random() * (maxX - minX) + minX, random() * (maxY - minY) + minY)
}

/** Creates a vector with random angle and ranging random magnitude. If multiple instances are plotted, a donut shape circumference will be seen` */
function vecRandAngle(min = 1, max = 1) {
    return vecFromAngle(random() * TWO_PI, random() * (max - min) + min)
}

/** Returns a copy of `v` rotated by `angle` radians */
function vecRotate(v, angle) {
    return vecFromAngle(vecHeading(v) + angle, vecMag(v))
}

/** Returns a copy of `v` with `f()` applied to each component of the vector */
function vecApply(v, f) {
    return vec(f(v[0]), f(v[1]))
}

/** The angle of a vector `v` */
function vecHeading(v) {
    return atan2(v[1], v[0])
}

/** Limits the magnitude of `v` to `max` */
function vecLimit(v, max) {
    return vecMag2(v) > max * max ? vecSetMag(v, max) : [v[0], v[1]]
}

/** Smoothly limits the magnitude of `v` to `max` */
function vecSmoothLimit(v, max, t) {
    const m = vecMag(v)
    return m > max ? vecSetMag(v, m + (max - m) * t) : [v[0], v[1]]
}

/** Returns a copy of `v` with it's components clamped to `(minX, maxX), (minY, maxY)` */
function vecClamp(v, minX, maxX, minY, maxY) {
    return vec(min(max(v[0], minX), maxX), min(max(v[1], minY), maxY))
}

/** Returns the linear interpolation of `v1` to `v2` at `t` */
function vecLerp(v1, v2, t) {
    return vec(v1[0] + (v2[0] - v1[0]) * t, v1[1] + (v2[1] - v1[1]) * t)
}

/** Returns the linear interpolation of each component of `v1` to `v2` at each component of `vT` */
function vecLerpVec(v1, v2, vT) {
    return vec(v1[0] + (v2[0] - v1[0]) * vT[0], v1[1] + (v2[1] - v1[1]) * vT[1])
}

/** Returns the linear interpolation of `v1` to `v2` at `t`, while also trying to keep angle and magnitude changes consistent */
function vecLerpStable(v1, v2, t) {
    const v1h = vecHeading(v1)
    const v1m = vecMag(v1)
    const angle = v1h + (vecHeading(v2) - v1h) * t
    const v3 = vecFromAngle(angle, v1m + (vecMag(v2) - v1m) * t)
    v3[1] = -v3[1]
    return v3
}

/** The distance between two vectors */
function vecDist(v1, v2) {
    return hypot(v1[0] - v2[0], v1[1] - v2[1])
}

/** The **Squared** distance between two vectors */
function vecDist2(v1, v2) {
    return (v1[0] - v2[0]) ** 2 + (v1[1] - v2[1]) ** 2
}

/** Stringifies a vector */
function vecToString(v) {
    return '{x:' + v[0] + ',y:' + v[1] + '}'
}

// #endregion

// #region RNG

// TODO: I don't think this is working
/**
* Creates a Random Number Generator
* @param seed - The seed to be used to create random numbers
* @return A random Number Generator function (0 <= r < 1)
*/
function installPRNG(seed) {
    if (typeof seed === 'string') {
        seed = seed
        .split('')
        .map(ch => ch.charCodeAt(0))
        .join('')
    }
    
    const a = 1664525
    const c = 1613904223
    const m = 2 ** 32
    
    const next = () => {
        seed = (a * seed + c) % m
        return seed
    }
    
    return () => next() / m
}

/**
* Pre calculates Random Int 16 Numbers
* @param size - The amount of numbers to be generated
* @return A random Number Generator function (0 <= r < 2^16)
*/
function installInt16PCRN(size = 1024) {
    const arr = new Uint16Array(size)
    let index = 0
    
    for (let i = 0; i < size; i++) {
        arr[i] = randI2(2 ** 16)
    }
    
    return () => {
        if (index > size) index = 0
        return arr[index++]
    }
}

function rand(r) {
    if (r == null) return random()
        
    if (typeof r === 'number') {
        if (arguments.length === 2)
            return rand(arguments[1] - arguments[0]) + arguments[0]
        return random() * r
    }
    
    if (typeof r === 'string') return r[floor(random() * r.length)]
    
    if (isArray(r)) return r[floor(random() * r.length)]
    
    const values = objectValues(r)
    
    return values[floor(random() * values.length)]
}

function randI(r = 2) {
    return arguments.length === 2
    ? floor(r + random() * (arguments[1] - r))
    : floor(random() * r)
}

function randI2(r = 2) {
    return floor(random() * r)
}

function randIRange(r1, r2) {
    return floor(r1 + random() * (r2 - r1))
}

function randF(r = 1) {
    return arguments.length === 2
    ? r + random() * (arguments[1] - r)
    : random() * r
}

function randF2(r = 1) {
    return random() * r
}

function randFRange(r1, r2) {
    return r1 + random() * (r2 - r1)
}

function randChar(r = 255) {
    return fromCharCode(random() * r)
}

function randCharRange(c1, c2) {
    let cc1 = c1.charCodeAt(0)
    let cc2 = c2.charCodeAt(0)
    ;[cc1, cc2] = [min(cc1, cc2), max(cc1, cc2), 97 + 26]
    return fromCharCode(cc1 + random() * (cc2 - cc1))
}

function randLetter() {
    return fromCharCode(97 + random() * 26)
}

function randLetterRange(r1, r2) {
    let rc1 = r1.charCodeAt(0)
    let rc2 = r2.charCodeAt(0)
    ;[rc1, rc2] = [max(min(rc1, rc2), 97), min(max(rc1, rc2), 97 + 26)]
    return fromCharCode(rc1 + random() * (rc2 - rc1))
}

function randItem(arr) {
    return arr[floor(random() * arr.length)]
}

function randKey(obj) {
    const keys = objectKeys(obj)
    return keys[floor(random() * keys.length)]
}

function randValue(obj) {
    const values = objectValues(obj)
    return values[floor(random() * values.length)]
}

function randID(length) {
    let id = ''
    while (id.length < length)
        id += random()
    .toString(36)
    .substring(2)
    return id.substring(0, length).toUpperCase()
}

// The paramaters of this function are kinda random...
// Just try some random values and maybe one will work
// TODO: Use 2D Vector math instead
function randPoints(w, h, amt = 500, minD = max(w, h) / amt, maxD = minD * 2) {
    const points = []
    
    for (let i = 0; i < amt; i++) {
        points.push(Vec2D.rand(0, w, 0, h))
    }
    
    const cycles = mathClamp(amt >> 8, 1, 4)
    const minDSquared = minD * minD
    const maxDSquared = maxD * maxD
    
    for (let i = 0; i < cycles; i++) {
        for (const point of points) {
            for (const other of points) {
                if (point === other) continue
                const d = point.dist2(other)
                if (d < minDSquared) point._toDestroy = true
                if (d > maxDSquared) continue
                const vPush = other.copy().sub(point)
                vPush.setMag(d * 0.5)
                other.add(vPush)
            }
        }
        
        for (let i = 0; i < points.length; i++) {
            if (points[i]._toDestroy) {
                points.splice(i--, 1)
            }
        }
    }
    
    for (let i = 0; i < points.length; i++) {
        const point = points[i]
        if (point.x < 0 || point.x >= w || point.y < 0 || point.y >= h) {
            points.splice(i--, 1)
        }
    }
    
    return points
}

/**
* Returns a random **item's value** from the array taking the weight into account
* @param wv - Array containing weight-value objects
* @return A random item's value from the array
*/
function randWeight(wv) {
    const values = wv.map(w => w.value)
    const weights = wv.map(w => w.weight)
    
    const accWeights = []
    for (let i = 0; i < weights.length; i++) {
        accWeights[i] = weights[i] + (accWeights[i - 1] || 0)
    }
    
    const maxAccWeights = accWeights[accWeights.length - 1]
    const r = maxAccWeights * random()
    
    for (let i = 0; i < values.length; i++) {
        if (accWeights[i] >= r) return values[i]
    }
}

/**
* Returns a random **item** from the array taking the weight into account
* @param wv - Array containing weight-value objects
* @return A random item from the array
*/
function randWeight2(wv) {
    const values = wv.map(w => w.value)
    const weights = wv.map(w => w.weight)
    
    const accWeights = []
    for (let i = 0; i < weights.length; i++) {
        accWeights[i] = weights[i] + (accWeights[i - 1] || 0)
    }
    
    const maxAccWeights = accWeights[accWeights.length - 1]
    const r = maxAccWeights * random()
    
    for (let i = 0; i < values.length; i++) {
        if (accWeights[i] >= r) return wv[i]
    }
}

/**
* Returns a random **item's index** from the array taking the weight into account
* @param wv - Array containing weight-value objects
* @return A random item's index from the array
*/
function randWeight3(wv) {
    const values = wv.map(w => w.value)
    const weights = wv.map(w => w.weight)
    
    const accWeights = []
    for (let i = 0; i < weights.length; i++) {
        accWeights[i] = weights[i] + (accWeights[i - 1] || 0)
    }
    
    const maxAccWeights = accWeights[accWeights.length - 1]
    const r = maxAccWeights * random()
    
    for (let i = 0; i < values.length; i++) {
        if (accWeights[i] >= r) return i
    }
}

// #endregion

// #region Color

function colorDist(c1, c2) {
    return hypot(c1[0] - c2[0], c1[1] - c2[1], c1[2] - c2[2])
}

function colorDist2(c1, c2) {
    return (c1[0] - c2[0]) ** 2 + (c1[1] - c2[1]) ** 2 + (c1[2] - c2[2]) ** 2
}

function colorLerp(c1, c2, t) {
    const c1T = colorType(c1)
    const c2T = colorType(c2)
    
    if (c1T === 'OkLAB' || c2T === 'OkLAB')
        throw new TypeError('Color lerping does not work with OkLAB format yet.')
    
    const cc1 = colorParse(c1T === 'HSL' ? colorHSLtoRGB(c1) : c1)
    const cc2 = colorParse(c2T === 'HSL' ? colorHSLtoRGB(c2) : c2)
    
    const final = colorMakeRGB(
        // r
        cc1[0] + (cc2[0] - cc1[0]) * t, // g
        cc1[1] + (cc2[1] - cc1[1]) * t, // b
        cc1[2] + (cc2[2] - cc1[2]) * t, // a
        cc1[3] + (cc2[3] - cc1[3]) * t
    )
    
    switch (c1T) {
        case 'HEX':
        return colorRGBtoHEX(final)
        case 'HSL':
        return colorRGBtoHSL(final)
        default:
        return final
    }
}

// https://www.alanzucconi.com/2016/01/06/colour-interpolation/
function colorLerp2(c1, c2, t) {
    const cc1 = colorParse(colorRGBtoHSL(c1))
    const cc2 = colorParse(colorRGBtoHSL(c2))
    let h
    let d = cc2[0] - cc1[0]
    
    if (cc1[0] > cc2[0]) {
        let h3 = cc2[0]
        cc2[0] = cc1[0]
        cc1[0] = h3
        d = -d
        t = 1 - t
    }
    
    if (d > 180) {
        cc1[0] = cc1[0] + 360
        h = (cc1[0] + t * (cc2[0] - cc1[0])) % 360
    } else {
        h = cc1[0] + t * d
    }
    
    return colorMakeRGB(
        h,
        cc1[1] + t * (cc2[1] - cc1[1]),
        cc1[2] + t * (cc2[2] - cc1[2]),
        cc1[3] + t * (cc2[3] - cc1[3])
    )
}

function colorMakeHEX(r, g, b, a = 1) {
    return isArray(r)
    ? colorMakeHEX(r[0], r[1], r[2], r[3])
    : '#' +
    floor(r)
    .toString(16)
    .padStart(2, '0')
    .substring(0, 2) +
    floor(g)
    .toString(16)
    .padStart(2, '0')
    .substring(0, 2) +
    floor(b)
    .toString(16)
    .padStart(2, '0')
    .substring(0, 2) +
    floor(a)
    .toString(16)
    .padStart(2, '0')
    .substring(0, 2)
}

function colorMakeRGB(r, g, b, a = 1) {
    return isArray(r)
    ? colorMakeRGB(r[0], r[1], r[2], r[3])
    : 'rgb(' + r + ',' + g + ',' + b + ',' + a + ')'
}

function colorMakeHSL(h, s, l, a = 1) {
    return isArray(h)
    ? colorMakeHSL(h[0], h[1], h[2], h[3])
    : 'hsl(' + h + ',' + s + '%,' + l + '%,' + a + ')'
}

function colorMakeOkLAB(L, a, b, A = 1) {
    return isArray(L)
    ? colorMakeOkLAB(L[0], L[1], L[2], L[3])
    : 'oklab(' + L + ',' + a + ',' + b + '/' + A + ')'
}

function colorParseHex(c) {
    if (c[0] === '#') return colorParseHex(c.substring(1))
        if (c.length === 3)
            return colorParseHex(c[0] + c[0] + c[1] + c[1] + c[2] + c[2] + 'ff')
    if (c.length === 4)
        return colorParseHex(c[0] + c[0] + c[1] + c[1] + c[2] + c[2] + c[3] + c[3])
    if (c.length === 6) return colorParseHex(c + 'ff')
        if ([0, 1, 2, 5].includes(c.length)) return [0, 0, 0, 0]
    
    return [
        parseInt(c[0] + c[1], 16) || 0, // r
        parseInt(c[2] + c[3], 16) || 0, // g
        parseInt(c[4] + c[5], 16) || 0, // b
        parseInt(c[6] + c[7], 16) || 0 // a
    ]
}

function colorParse(c, standardize = true) {
    if (isArray(c)) return c
    if (typeof c !== 'string') return [255, 0, 255, 255]
    
    switch (colorType(c)) {
        case 'HEX':
        return colorParseHex(c.substring(1))
        case 'HSL':
        case 'RGB':
        //  return c.split(/[a-z]|\(|\)/g).filter(c => c)[0].split(',').map(c => parseFloat(c))
        case 'OkLAB':
        return c
        .split(/[a-z]|\(|\)/g)
        .filter(c => c)[0]
        .split(/,|\//g)
        .map(c => parseFloat(c))
        default:
        if (!standardize) return [255, 0, 255, 255]
        if (c === 'black') return [0, 0, 0, 255]
        const ctx = document.createElement('canvas').getContext('2d')
        if (!ctx) return [255, 0, 255, 255]
        ctx.fillStyle = c
        return colorParse(ctx.fillStyle)
    }
}

function colorType(c) {
    switch (c.trim()[0]) {
        case '#':
        if (c.length < 10 && c.length > 3 && parseInt(c.substring(1), 16) != null)
            return 'HEX'
        case 'h':
        case 'H':
        if (c.indexOf('(') > 0 && c.indexOf(')') > 0) return 'HSL'
        case 'r':
        case 'R':
        if (c.indexOf('(') > 0 && c.indexOf(')') > 0) return 'RGB'
        case 'o':
        case 'O':
        if (c.indexOf('(') > 0 && c.indexOf(')') > 0) return 'OkLAB'
        default:
        return null
    }
}

function colorRandRGB(r = [0, 255], g = [0, 255], b = [0, 255], a = [1, 1]) {
    return colorMakeRGB(
        randIRange(r[0], r[1]),
        randIRange(g[0], g[1]),
        randIRange(b[0], b[1]),
        randIRange(a[0], a[1])
    )
}

function colorRandHSL(h = [0, 360], s = [0, 100], l = [0, 100], a = [1, 1]) {
    return colorMakeHSL(
        randIRange(h[0], h[1]),
        randIRange(s[0], s[1]),
        randIRange(l[0], l[1]),
        randIRange(a[0], a[1])
    )
}

function colorGetBrightness(r, g, b) {
    return 0.21 * r + 0.72 * g + 0.07 * b
}

function colorHEXtoRGB(hex) {
    hex = hex.substring(1)
    if (hex.length < 6) {
        let temp = ''
        for (let i = 0; i < 3; i++) temp += hex[i] + hex[i]
        hex = temp
    }
    
    if (hex.length === 6) hex += 'ff'
    
    return colorMakeRGB(
        // r
        parseInt(hex.substring(0, 2), 16), // g
        parseInt(hex.substring(2, 4), 16), // b
        parseInt(hex.substring(4, 6), 16), // a
        parseInt(hex.substring(6, 8), 16) / 255
    )
}

function colorHEXtoHSL(hex) {
    return colorRGBtoHSL(colorHEXtoRGB(hex))
}

function colorHEXtoOkLAB(hex) {
    return colorRGBtoOkLAB(colorHEXtoRGB(hex))
}

function colorRGBtoHEX(rgb) {
    const crgb = colorParse(rgb)
    const r = (crgb[0] | 0).toString(16).padStart(2, '0')
    const g = (crgb[1] | 0).toString(16).padStart(2, '0')
    const b = (crgb[2] | 0).toString(16).padStart(2, '0')
    const a = ((255 * crgb[3]) | 0)
    .toString(16)
    .padStart(2, '0')
    .substring(0, 2)
    
    return '#' + r + '' + g + '' + b + '' + a
}

// https://www.30secondsofcode.org/js/s/rgb-to-hsl
function colorRGBtoHSL(rgb) {
    const crgb = colorParse(rgb)
    const r = crgb[0] / 255
    const g = crgb[1] / 255
    const b = crgb[2] / 255
    const l = mathMax([r, g, b])
    const s = l - mathMin([r, g, b])
    const h = s
    ? l === r
    ? (g - b) / s
    : l === g
    ? 2 + (b - r) / s
    : 4 + (r - g) / s
    : 0
    
    return colorMakeHSL(
        60 * h < 0 ? 60 * h + 360 : 60 * h,
        100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
        (100 * (2 * l - s)) / 2,
        crgb[3] ?? 100
    )
}

function colorHSLtoHEX(hsl) {
    return colorRGBtoHEX(colorHSLtoRGB(hsl))
}

// https://www.30secondsofcode.org/js/s/hsl-to-rgb
function colorHSLtoRGB(hsl) {
    const chsl = colorParse(hsl)
    const h = chsl[0]
    const s = chsl[1] / 100
    const l = chsl[2] / 100
    const k = n => (n + h / 30) % 12
    const a = s * min(l, 1 - l)
    const f = n => l - a * max(-1, min(k(n) - 3, min(9 - k(n), 1)))
    
    return colorMakeRGB(255 * f(0), 255 * f(8), 255 * f(4), chsl[3] ?? 1)
}

function colorHSLtoOkLAB(hsl) {
    return colorRGBtoOkLAB(colorHSLtoRGB(hsl))
}

// #region https://gist.github.com/earthbound19/e7fe15fdf8ca3ef814750a61bc75b5ce
// Lab coordinates (parameters):
// L = Lightness (0 (black) to ?? (diffuse white)
// a = green (at negative -- is there a lower bound?) to red (positive)
// b = blue (at negative) to yellow (at positive).
// You can manually construct an object literal to pass to this function this way:
// labVals = {L: 0.75, a: 0.7, b: 0.2};
// sRGBresultObjectLiteral = oklabToSRGB(labVals);
// You can also construct that as just {0.75, 0.7, 0.2}, and still pass it and it will work, apparently
// '..Oklab is represented as an object {L, a, b} where L is between 0 and 1 for normal SRGB colors. a and b have a less clearly defined range, but will normally be between -0.5 and +0.5. Neutral gray colors will have a and b at zero (or very close).' re: https://www.npmjs.com/package/oklab
// numbers updated from C++ example at https://bottosson.github.io/posts/oklab/ as updated 2021-01-25
// helpful references:
// https://observablehq.com/@sebastien/srgb-rgb-gamma
// Other references: https://matt77hias.github.io/blog/2018/07/01/linear-gamma-and-sRGB-color-spaces.html
// Takeaway: before manipulating color for sRGB (gamma-corrected or gamma compressed), convert it to linear RGB or a linear color space. Then do the manipulation, then convert it back to sRGB.
function colorRGBtoOkLAB(rgb) {
    const crgb = colorParse(rgb)
    let [r, g, b, a] = crgb
    // This is my undersanding: JavaScript canvas and many other virtual and literal devices use gamma-corrected (non-linear lightness) RGB, or sRGB. To convert sRGB values for manipulation in the Oklab color space, you must first convert them to linear RGB. Where Oklab interfaces with RGB it expects and returns linear RGB values. This next step converts (via a function) sRGB to linear RGB for Oklab to use:
    r = _gammaToLinear(r / 255)
    g = _gammaToLinear(g / 255)
    b = _gammaToLinear(b / 255)
    // This is the Oklab math:
    let l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
    let m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
    let s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
    // Math.crb (cube root) here is the equivalent of the C++ cbrtf function here: https://bottosson.github.io/posts/oklab/#converting-from-linear-srgb-to-oklab
    l = cbrt(l)
    m = cbrt(m)
    s = cbrt(s)
    
    return colorMakeOkLAB(
        l * +0.2104542553 + m * +0.793617785 + s * -0.0040720468,
        l * +1.9779984951 + m * -2.428592205 + s * +0.4505937099,
        l * +0.0259040371 + m * +0.7827717662 + s * -0.808675766,
        a
    )
}

function colorOkLABToHEX(okLab) {
    return colorRGBtoHEX(colorOkLABtoRGB(okLab))
}

function colorOkLABToHSL(okLab) {
    return colorRGBtoHSL(colorOkLABtoRGB(okLab))
}

function colorOkLABtoRGB(okLab) {
    const cokLab = colorParse(okLab)
    let [L, a, b, A] = cokLab
    const l = pow(L + a * +0.3963377774 + b * +0.2158037573, 3)
    const m = pow(L + a * -0.1055613458 + b * -0.0638541728, 3)
    const s = pow(L + a * -0.0894841775 + b * -1.291485548, 3)
    const R = l * +4.0767416621 + m * -3.3077115913 + s * +0.2309699292
    const G = l * -1.2684380046 + m * +2.6097574011 + s * -0.3413193965
    const B = l * -0.0041960863 + m * -0.7034186147 + s * +1.707614701
    
    // Convert linear RGB values returned from oklab math to sRGB for our use before returning them:
    // OPTION: clamp r g and b values to the range 0-255; but if you use the values immediately to draw, JavaScript clamps them on use:
    // OPTION: round the values. May not be necessary if you use them immediately for rendering in JavaScript, as JavaScript (also) discards decimals on render:
    return colorMakeRGB(
        round(mathClamp(255 * _linearToGamma(R), 0, 255)),
        round(mathClamp(255 * _linearToGamma(G), 0, 255)),
        round(mathClamp(255 * _linearToGamma(B), 0, 255)),
        A
    )
}
// #endregion

function colorAddLightness(c, v) {
    const c_ = c
    let ac = colorParse(c)
    if (c_[0] == '#') ac[3] /= 2.55
    if (c_[0] !== 'h') {
        c = colorRGBtoHSL(c_)
        ac = colorParse(c)
    }
    ac[2] += v
    
    switch (colorType(c_)) {
        case 'HSL':
        return colorMakeHSL(ac[0], ac[1], ac[2], ac[3])
        case 'HEX':
        return colorHSLtoHEX(ac)
        case 'RGB':
        return colorHSLtoRGB(ac)
        default:
        return c_
    }
}

function colorExtend(c, includeAlpha = false) {
    if (colorType(c) !== 'HEX') return c
    if (c.length === (includeAlpha ? 9 : 7)) return c
    const cc = colorParse(c)
    
    return colorMakeHEX(cc[0], cc[1], cc[2], cc[3]).slice(0, includeAlpha ? 9 : 7)
}

// #endregion

// #region Graphics

/**
* Creates an expanded rendering context
* @param w - Width of the canvas
* @param h - Height of the canvas
* @param pixelArt - If canvas is pixelated or not
* @param append - The element to append the canvas to; defaults to document.body
* @param settings - Rendering context options to be set
* @return {CanvasRenderingContext2D & context}
*/
function installGFX(
    w = 800,
    h = 600,
    pixelArt = false,
    append = document.body,
    settings = {}
) {
    let canvas = _canvas(w, h)
    if (append) {
        append.append(canvas)
    }
    // @ts-ignore
    canvas.style = `display:block;touch-action:none${
        pixelArt ? ';image-rendering:pixelated' : ''
    }`
    canvas.oncontextmenu = e => e.preventDefault()
    let gfx = canvas.getContext('2d', settings)
    if (gfx == null) {
        throw new Error('Could not get the CanvasRenderingContext2D. \'canvas.getContext()\' failed.')
    }
    gfx.imageSmoothingEnabled = !pixelArt
    
    let _font = 'normal normal normal 10px sans-serif'
    
    const context = {
        get width() {
            return canvas.width
        },
        get height() {
            return canvas.height
        },
        hideCursor() {
            canvas.style.cursor = 'none'
        },
        showCursor() {
            canvas.style.cursor = 'default'
        },
        fullscreen() {
            canvas.requestFullscreen()
        },
        pointerLock() {
            canvas.requestPointerLock()
        },
        clear() {
            gfx.clearRect(0, 0, canvas.width, canvas.height)
        },
        copy() {
            const copy = installGFX(
                canvas.width,
                canvas.height,
                false,
                null,
                settings
            )
            for (const key in gfx) {
                // @ts-ignore
                if (typeof gfx[key] === 'function') continue
                // @ts-ignore
                copy[key] = gfx[key]
            }
            copy.drawImage(canvas, 0, 0, this.width, this.height)
            return copy
        },
        background(c, fixed = true) {
            if (fixed) gfx.save()
                if (fixed) gfx.resetTransform()
                    if (validCanvasISources.includes(c.constructor.name)) {
                this.imageFill(c, 0, 0, canvas.width, canvas.height)
            } else {
                gfx.fillStyle = c
                gfx.fillRect(0, 0, canvas.width, canvas.height)
            }
            if (fixed) gfx.restore()
            },
        fillRect_rt(x, y, w, h) {
            gfx.fillRect(round(x), round(y), round(w), round(h))
        },
        strokeRect_rt(x, y, w, h) {
            gfx.strokeRect(round(x), round(y), round(w), round(h))
        },
        rect_rt(x, y, w, h) {
            gfx.beginPath()
            gfx.rect(round(x), round(y), round(w), round(h))
            gfx.fill()
            gfx.stroke()
        },
        fillRectCentered(x, y, w, h, angle) {
            w = round(w)
            h = round(h)
            
            if (angle) {
                gfx.translate(x, y)
                gfx.rotate(angle)
                gfx.fillRect(round(-w * 0.5), round(-h * 0.5), w, h)
                return
            }
            
            gfx.fillRect(round(x - w * 0.5), round(y - h * 0.5), w, h)
        },
        strokeRectCentered(x, y, w, h, angle) {
            w = round(w)
            h = round(h)
            
            if (angle) {
                gfx.translate(x, y)
                gfx.rotate(angle)
                gfx.strokeRect(round(-w * 0.5), round(-h * 0.5), w, h)
                return
            }
            
            gfx.strokeRect(round(x - w * 0.5), round(y - h * 0.5), w, h)
        },
        rectCentered(x, y, w, h) {
            w = round(w)
            h = round(h)
            gfx.beginPath()
            gfx.rect(round(x - w * 0.5), round(y - h * 0.5), w, h)
            gfx.fill()
            gfx.stroke()
        },
        fillRectTransformed(x, y, w, h, sx, sy, angle) {
            w = round(w)
            h = round(h)
            
            if (angle || !(sx === 1 && sy === 1)) {
                gfx.save()
                gfx.translate(x, y)
                gfx.rotate(angle)
                gfx.scale(sx, sy)
                gfx.fillRect(round(-w * 0.5), round(-h * 0.5), w, h)
                gfx.restore()
                return
            }
            
            gfx.fillRect(round(x - w * 0.5), round(y - h * 0.5), w, h)
        },
        strokeRectTransformed(x, y, w, h, sx, sy, angle) {
            w = round(w)
            h = round(h)
            
            if (angle || !(sx === 1 && sy === 1)) {
                gfx.save()
                gfx.translate(x, y)
                gfx.rotate(angle)
                gfx.scale(sx, sy)
                gfx.strokeRect(round(-w * 0.5), round(-h * 0.5), w, h)
                gfx.restore()
                return
            }
            
            gfx.strokeRect(round(x - w * 0.5), round(y - h * 0.5), w, h)
        },
        rectTransformed(x, y, w, h, sx, sy, angle) {
            w = round(w)
            h = round(h)
            
            if (angle || !(sx === 1 && sy === 1)) {
                gfx.save()
                gfx.translate(x, y)
                gfx.rotate(angle)
                gfx.scale(sx, sy)
                gfx.fillRect(round(-w * 0.5), round(-h * 0.5), w, h)
                gfx.strokeRect(round(-w * 0.5), round(-h * 0.5), w, h)
                gfx.restore()
                return
            }
            
            gfx.fillRect(round(x - w * 0.5), round(y - h * 0.5), w, h)
            gfx.strokeRect(round(-w * 0.5), round(-h * 0.5), w, h)
        },
        fastFillSquare(x, y, l) {
            const _stroke = gfx.strokeStyle
            const _cap = gfx.lineCap
            gfx.beginPath()
            gfx.strokeStyle = gfx.fillStyle
            gfx.lineWidth = l
            gfx.lineCap = 'square'
            gfx.lineTo(x + 0.5 * l, y + 0.5 * l)
            gfx.stroke()
            gfx.strokeStyle = _stroke
            gfx.lineCap = _cap
        },
        fastFillSquareCenter(x, y, l) {
            const _stroke = gfx.strokeStyle
            const _cap = gfx.lineCap
            gfx.beginPath()
            gfx.strokeStyle = gfx.fillStyle
            gfx.lineWidth = 2 * l
            gfx.lineCap = 'square'
            gfx.lineTo(x, y)
            gfx.stroke()
            gfx.strokeStyle = _stroke
            gfx.lineCap = _cap
        },
        fillSquare(x, y, l) {
            l = round(l)
            gfx.fillRect(round(x), round(y), l, l)
        },
        strokeSquare(x, y, l) {
            l = round(l)
            gfx.strokeRect(round(x), round(y), l, l)
        },
        square(x, y, l) {
            l = round(l)
            gfx.beginPath()
            gfx.rect(round(x), round(y), l, l)
            gfx.fill()
            gfx.stroke()
        },
        fillSquareCentered(x, y, l) {
            l = round(l)
            gfx.fillRect(round(x - l * 0.5), round(y - h * 0.5), l, l)
        },
        strokeSquareCentered(x, y, l) {
            l = round(l)
            gfx.strokeRect(round(x - l * 0.5), round(y - h * 0.5), l, l)
        },
        squareCentered(x, y, l) {
            l = round(l)
            gfx.beginPath()
            gfx.rect(round(x - l * 0.5), round(y - h * 0.5), l, l)
            gfx.fill()
            gfx.stroke()
        },
        fastFillCircle(x, y, l) {
            const _stroke = gfx.strokeStyle
            const _cap = gfx.lineCap
            gfx.beginPath()
            gfx.strokeStyle = gfx.fillStyle
            gfx.lineWidth = 2 * l
            gfx.lineCap = 'round'
            gfx.lineTo(x + l, y + l)
            gfx.stroke()
            gfx.strokeStyle = _stroke
            gfx.lineCap = _cap
        },
        fastFillCircleCorner(x, y, l) {
            const _stroke = gfx.strokeStyle
            const _cap = gfx.lineCap
            gfx.beginPath()
            gfx.strokeStyle = gfx.fillStyle
            gfx.lineWidth = 2 * l
            gfx.lineCap = 'round'
            gfx.lineTo(x + l, y + l)
            gfx.stroke()
            gfx.strokeStyle = _stroke
            gfx.lineCap = _cap
        },
        fillCircle(x, y, r, sa = 0, ea = TWO_PI) {
            gfx.beginPath()
            gfx.arc(round(x), round(y), r, sa, ea)
            gfx.fill()
        },
        strokeCircle(x, y, r, sa = 0, ea = TWO_PI) {
            gfx.beginPath()
            gfx.arc(round(x), round(y), r, sa, ea)
            gfx.closePath()
            gfx.stroke()
        },
        circle(x, y, r, sa = 0, ea = TWO_PI) {
            gfx.beginPath()
            gfx.arc(round(x), round(y), r, sa, ea)
            gfx.closePath()
            gfx.fill()
            gfx.stroke()
        },
        fillCircleCorner(x, y, r, sa = 0, ea = TWO_PI) {
            gfx.beginPath()
            gfx.arc(round(x + r * 0.5), round(y + r * 0.5), r, sa, ea)
            gfx.fill()
        },
        strokeCircleCorner(x, y, r, sa = 0, ea = TWO_PI) {
            gfx.beginPath()
            gfx.arc(round(x + r * 0.5), round(y + r * 0.5), r, sa, ea)
            gfx.closePath()
            gfx.stroke()
        },
        circleCorner(x, y, r, sa = 0, ea = TWO_PI) {
            gfx.beginPath()
            gfx.arc(round(x + r * 0.5), round(y + r * 0.5), r, sa, ea)
            gfx.closePath()
            gfx.fill()
            gfx.stroke()
        },
        fillEllipse(x, y, xr, yr, rot, sa = 0, ea = TWO_PI) {
            gfx.beginPath()
            gfx.ellipse(round(x), round(y), xr, yr, rot, sa, ea)
            gfx.fill()
        },
        strokeEllipse(x, y, xr, yr, rot, sa = 0, ea = TWO_PI) {
            gfx.beginPath()
            gfx.ellipse(round(x), round(y), xr, yr, rot, sa, ea)
            gfx.closePath()
            gfx.stroke()
        },
        ellipse(x, y, xr, yr, rot, sa = 0, ea = TWO_PI) {
            gfx.beginPath()
            gfx.ellipse(round(x), round(y), xr, yr, rot, sa, ea)
            gfx.closePath()
            gfx.fill()
            gfx.stroke()
        },
        fillEllipseCorner(x, y, xr, yr, rot, sa = 0, ea = TWO_PI) {
            gfx.beginPath()
            gfx.ellipse(round(x + xr * 0.5), round(y + yr * 0.5), xr, yr, rot, sa, ea)
            gfx.fill()
        },
        strokeEllipseCorner(x, y, xr, yr, rot, sa = 0, ea = TWO_PI) {
            gfx.beginPath()
            gfx.ellipse(round(x + xr * 0.5), round(y + yr * 0.5), xr, yr, rot, sa, ea)
            gfx.closePath()
            gfx.stroke()
        },
        ellipseCorner(x, y, xr, yr, rot, sa = 0, ea = TWO_PI) {
            gfx.beginPath()
            gfx.ellipse(round(x + xr * 0.5), round(y + yr * 0.5), xr, yr, rot, sa, ea)
            gfx.closePath()
            gfx.fill()
            gfx.stroke()
        },
        fillTriangle(x1, y1, x2, y2, x3, y3) {
            gfx.beginPath()
            gfx.moveTo(round(x1), round(y1))
            gfx.lineTo(round(x2), round(y2))
            gfx.lineTo(round(x3), round(y3))
            gfx.fill()
        },
        strokeTriangle(x1, y1, x2, y2, x3, y3) {
            gfx.beginPath()
            gfx.moveTo(round(x1), round(y1))
            gfx.lineTo(round(x2), round(y2))
            gfx.lineTo(round(x3), round(y3))
            gfx.closePath()
            gfx.stroke()
        },
        triangle(x1, y1, x2, y2, x3, y3) {
            gfx.beginPath()
            gfx.moveTo(round(x1), round(y1))
            gfx.lineTo(round(x2), round(y2))
            gfx.lineTo(round(x3), round(y3))
            gfx.closePath()
            gfx.fill()
            gfx.stroke()
        },
        text(txt, x, y, maxWidth) {
            gfx.font = _font
            gfx.fillText(txt, x, y, maxWidth)
            gfx.strokeText(txt, x, y, maxWidth)
        },
        fillTextBoxed(
            txt,
            x,
            y,
            w,
            h,
            { spacingExtraPad = 0, lineHeightFac = 1 } = {}
        ) {
            const _textAlign = gfx.textAlign
            const _textBaseline = gfx.textBaseline
            
            if (w) {
                x -= _textAlign === 'center' ? 0.5 * w : _textAlign === 'right' ? w : 0
            }
            
            if (h) {
                y -=
                _textBaseline === 'middle'
                ? 0.5 * h
                : _textBaseline === 'bottom'
                ? h
                : 0
            }
            
            gfx.textAlign = 'left'
            gfx.textBaseline = 'top'
            gfx.font = _font
            const fontSize = parseFloat(this.getFontSize())
            let _w = 0
            let _h = 0
            
            const splitted = txt
            .trim()
            .replace(/\n/g, ' __`^#$NEW_LINE$#^´__ ')
            .replace(/ /g, '__`^#$SPACE$#^´__')
            .split('__`^#$SPACE$#^´__')
            
            for (let word of splitted) {
                const m = gfx.measureText(word + ' ')
                
                if (word === '__`^#$NEW_LINE$#^´__') {
                    _w = 0
                    _h += fontSize * lineHeightFac
                    continue
                }
                
                if (word === '\n' || _w + m.width > w) {
                    _w = 0
                    _h += fontSize * lineHeightFac
                }
                
                gfx.fillText(word + ' ', x + _w, y + _h)
                _w += m.width + spacingExtraPad
                
                if (_h > h) return
            }
            
            gfx.textAlign = _textAlign
            gfx.textBaseline = _textBaseline
        },
        strokeTextBoxed(
            txt,
            x,
            y,
            w,
            h,
            { spacingExtraPad = 0, lineHeightFac = 1 } = {}
        ) {
            const _textAlign = gfx.textAlign
            const _textBaseline = gfx.textBaseline
            
            if (w) {
                x -= _textAlign === 'center' ? 0.5 * w : _textAlign === 'right' ? w : 0
            }
            
            if (h) {
                y -=
                _textBaseline === 'middle'
                ? 0.5 * h
                : _textBaseline === 'bottom'
                ? h
                : 0
            }
            
            gfx.textAlign = 'left'
            gfx.textBaseline = 'top'
            gfx.font = _font
            const fontSize = parseFloat(this.getFontSize())
            let _w = 0
            let _h = 0
            
            const splitted = txt
            .trim()
            .replace(/\n/g, ' __`^#$NEW_LINE$#^´__ ')
            .replace(/ /g, '__`^#$SPACE$#^´__')
            .split('__`^#$SPACE$#^´__')
            
            for (let word of splitted) {
                const m = gfx.measureText(word + ' ')
                
                if (word === '__`^#$NEW_LINE$#^´__') {
                    _w = 0
                    _h += fontSize * lineHeightFac
                    continue
                }
                
                if (word === '\n' || _w + m.width > w) {
                    _w = 0
                    _h += fontSize * lineHeightFac
                }
                
                gfx.strokeText(word + ' ', x + _w, y + _h)
                _w += m.width + spacingExtraPad
                
                if (_h > h) return
            }
            
            gfx.textAlign = _textAlign
            gfx.textBaseline = _textBaseline
        },
        textBoxed(
            txt,
            x,
            y,
            w,
            h,
            { spacingExtraPad = 0, lineHeightFac = 1 } = {}
        ) {
            const _textAlign = gfx.textAlign
            const _textBaseline = gfx.textBaseline
            
            if (w) {
                x -= _textAlign === 'center' ? 0.5 * w : _textAlign === 'right' ? w : 0
            }
            
            if (h) {
                y -=
                _textBaseline === 'middle'
                ? 0.5 * h
                : _textBaseline === 'bottom'
                ? h
                : 0
            }
            
            gfx.textAlign = 'left'
            gfx.textBaseline = 'top'
            gfx.font = _font
            const fontSize = parseFloat(this.getFontSize())
            let _w = 0
            let _h = 0
            
            const splitted = txt
            .trim()
            .replace(/\n/g, ' __`^#$NEW_LINE$#^´__ ')
            .replace(/ /g, '__`^#$SPACE$#^´__')
            .split('__`^#$SPACE$#^´__')
            
            for (let word of splitted) {
                const m = gfx.measureText(word + ' ')
                
                if (word === '__`^#$NEW_LINE$#^´__') {
                    _w = 0
                    _h += fontSize * lineHeightFac
                    continue
                }
                
                if (word === '\n' || _w + m.width > w) {
                    _w = 0
                    _h += fontSize * lineHeightFac
                }
                
                gfx.fillText(word + ' ', x + _w, y + _h)
                gfx.strokeText(word + ' ', x + _w, y + _h)
                _w += m.width + spacingExtraPad
                
                if (_h > h) return
            }
            
            gfx.textAlign = _textAlign
            gfx.textBaseline = _textBaseline
        },
        line(x1, y1, x2, y2) {
            gfx.beginPath()
            gfx.moveTo(round(x1), round(y1))
            gfx.lineTo(round(x2), round(y2))
            gfx.stroke()
        },
        arrow(x1, y1, x2, y2, l = 10, a = 0.5) {
            const heading = mathPointTo(x2, y2, x1, y1)
            gfx.beginPath()
            gfx.moveTo(round(x1), round(y1))
            gfx.lineTo(round(x2), round(y2))
            gfx.lineTo(
                round(x2 + cos(heading + a) * l),
                round(y2 - sin(heading + a) * l)
            )
            gfx.moveTo(round(x2), round(y2))
            gfx.lineTo(
                round(x2 + cos(heading - a) * l),
                round(y2 - sin(heading - a) * l)
            )
            gfx.stroke()
        },
        point(x, y) {
            gfx.beginPath()
            gfx.arc(round(x), round(y), gfx.lineWidth, 0, TWO_PI)
            gfx.fill()
        },
        buildShape(x, y, points) {
            gfx.moveTo(x + points[0], y + points[1])
            for (let i = 2; i < points.length; ++i) {
                gfx.lineTo(x + points[i], y + points[++i])
            }
        },
        fillShape(x, y, points) {
            gfx.beginPath()
            gfx.moveTo(x + points[0], y + points[1])
            for (let i = 2; i < points.length; ++i) {
                gfx.lineTo(x + points[i], y + points[++i])
            }
            gfx.fill()
        },
        strokeShape(x, y, points) {
            gfx.beginPath()
            gfx.moveTo(x + points[0], y + points[1])
            for (let i = 2; i < points.length; ++i) {
                gfx.lineTo(x + points[i], y + points[++i])
            }
            gfx.closePath()
            gfx.stroke()
        },
        shape(x, y, points) {
            gfx.beginPath()
            gfx.moveTo(x + points[0], y + points[1])
            for (let i = 2; i < points.length; ++i) {
                gfx.lineTo(x + points[i], y + points[++i])
            }
            gfx.closePath()
            gfx.fill()
            gfx.stroke()
        },
        image(img, x, y, w, h) {
            gfx.drawImage(img, round(x), round(y), w || img.width, h || img.height)
        },
        imagePart(img, sx, sy, sw, sh, x, y, w, h) {
            gfx.drawImage(img, sx, sy, sw, sh, round(x), round(y), w, h)
        },
        imageCentered(
            img,
            x,
            y,
            w = img.width || img.videoWidth || 0,
            h = img.height || img.videoHeight || 0,
            angle = 0
        ) {
            if (angle) {
                gfx.translate(x, y)
                gfx.rotate(angle)
                gfx.drawImage(img, round(-w * 0.5), round(-h * 0.5), w, h)
                return
            }
            gfx.drawImage(img, round(x - w * 0.5), round(y - h * 0.5), w, h)
        },
        imagePartCentered(
            img,
            sx,
            sy,
            sw,
            sh,
            x,
            y,
            w = img.width ?? 0,
            h = img.height ?? 0
        ) {
            gfx.drawImage(
                img,
                sx,
                sy,
                sw,
                sh,
                round(x - w * 0.5),
                round(y - h * 0.5),
                w,
                h
            )
        },
        imageTransformed(
            img,
            x,
            y,
            w = img.width ?? 0,
            h = img.height ?? 0,
            sx = 1,
            sy = 1,
            angle = 0
        ) {
            if (angle || !(sx === 1 && sy === 1)) {
                gfx.save()
                gfx.translate(x, y)
                gfx.rotate(angle)
                gfx.scale(sx, sy)
                gfx.drawImage(img, round(-w * 0.5), round(-h * 0.5), w, h)
                gfx.restore()
                return
            }
            gfx.drawImage(img, round(x - w * 0.5), round(y - h * 0.5), w, h)
        },
        imageFill(img, x, y, w, h, mode = 0) {
            const scl =
            mode === 0
            ? max(w / img.width, h / img.height)
            : min(w / img.width, h / img.height)
            let iw = img.width * scl
            let ih = img.height * scl
            this.imageCentered(img, round(x + w * 0.5), round(y + h * 0.5), iw, ih)
        },
        imagePartCover(
            img,
            sx,
            sy,
            sw,
            sh,
            x,
            y,
            w = img.width ?? 0,
            h = img.height ?? 0
        ) {
            let iw = img.width
            let ih = img.height
            if (w / ih < h / iw) {
                iw = (ih / ih) * h
                ih = h
            } else {
                iw = w
                ih = (ih / iw) * w
            }
            gfx.drawImage(
                img,
                sx,
                sy,
                sw,
                sh,
                round(x + w * 0.5),
                round(y + h * 0.5),
                iw,
                ih
            )
        },
        setSize(w, h) {
            if (canvas.width !== w) canvas.width = w
            if (canvas.height !== h) canvas.height = h
        },
        setWeight(weight) {
            gfx.lineWidth = weight
        },
        setFont(family, size, weight, variant, style) {
            if (size != null) size = typeof size === 'string' ? size : size + 'px'
            _font = gfx.font =
            (style || '') +
            ' ' +
            (variant || '') +
            ' ' +
            (weight || this.getFontWeight()) +
            ' ' +
            (size ?? this.getFontSize()) +
            ' ' +
            (family || this.getFontFamily())
        },
        setFontFamily(family) {
            let temp = _font.split(' ')
            temp[4] = family
            _font = gfx.font = temp.join(' ')
        },
        setFontSize(size) {
            let temp = _font.split(' ')
            temp[3] = typeof size === 'string' ? size : size + 'px'
            _font = gfx.font = temp.join(' ')
        },
        setFontWeight(weight) {
            let temp = _font.split(' ')
            temp[2] = weight.toString()
            _font = gfx.font = temp.join(' ')
        },
        setSharpness(bool) {
            gfx.imageSmoothingEnabled = !bool
        },
        setTextMode(align, baseline) {
            gfx.textAlign = align
            gfx.textBaseline = baseline
        },
        alpha(opacity) {
            gfx.globalAlpha = opacity
        },
        getFontSize() {
            return _font.split(' ')[3]
        },
        getFontFamily() {
            return _font.split(' ')[4]
        },
        getFontWeight() {
            return _font.split(' ')[2]
        },
        getPixel(x, y) {
            return gfx.getImageData(x, y, 1, 1).data
        },
        getTextPixels(
            txt,
            fontFamily = 'monospace',
            fontSize = 42,
            threshold = 127
        ) {
            const tempCanvas = document.createElement('canvas')
            const gfx = tempCanvas.getContext('2d')
            if (gfx == null) throw new ReferenceError('Cannot get the context from a canvas.')
                gfx.imageSmoothingEnabled = false
            gfx.textAlign = 'left'
            gfx.textBaseline = 'top'
            gfx.font = `${fontSize}px ${fontFamily}`
            
            const measure = gfx.measureText(txt)
            const width = ceil(measure.width)
            const height = fontSize
            tempCanvas.width = width
            tempCanvas.height = height
            gfx.textAlign = 'left'
            gfx.textBaseline = 'top'
            gfx.font = `${fontSize}px ${fontFamily}`
            gfx.fillStyle = '#fff'
            gfx.fillText(txt, 0, 0)
            
            const iData = gfx.getImageData(0, 0, width, height).data
            const len = iData.length
            const pixels = []
            
            for (let i = 0; i < len; i += 4) {
                if (iData[i + 3] > threshold) {
                    const y = floor((i >> 2) / width)
                    const x = (i >> 2) - y * width
                    pixels.push([x, y])
                }
            }
            
            return {
                pixels,
                measure: {
                    width,
                    height
                }
            }
        }
    }
    
    // Adds every enumerable method and property from gfx to context in a proper way
    for (const key in gfx) {
        // @ts-ignore
        const prop = gfx[key]
        if (typeof prop === 'function')
            // @ts-ignore
        context[key] = prop.bind(gfx)
        else
        Object.defineProperty(context, key, {
            // @ts-ignore
            get() {
                return gfx[key]
            },
            // @ts-ignore
            set(v) {
                return (gfx[key] = v)
            }
        })
    }
    
    return context
}

/**
* Creates a screen that looks for resize events and updates the main canvas
* @param {ReturnType<typeof installGFX>} gfx - Context to be handled
* @param {Function} onResize - Function to be called when the screen resize event is fired
* @param {boolean} cover - If the canvas should cover the screen or not
*/
function installScreen(gfx, onResize, cover = false) {
    let baseW = gfx.canvas.width
    let baseH = gfx.canvas.height
    let scl = 1
    let resizeCB = () => {}
    setTimeout(() => {
        if (onResize) {
            resizeCB = onResize
        }
    })
    
    // document.body.style.background = 'black'
    domElement('style', { id: '_screen-style_', append: document.body }).innerHTML = `
    body {
       position: fixed;
       top: 0;
       left: 0;
       width: 100vw;
       height: 100vh;
       max-width: unset;
       max-height: unset;
       display: flex;
       align-items: center;
       justify-content: center;
       height: 100vh;
       margin: 0;
       padding: 0;
    }
    `
    gfx.canvas.style.position = 'fixed'
    
    const rescale = () => {
        const scale = cover
        ? max(innerWidth / baseW, innerHeight / baseH)
        : min(innerWidth / baseW, innerHeight / baseH)
        
        const newWidth = baseW * scale + 'px'
        if (gfx.canvas.style.width === newWidth) return
        const newHeight = baseH * scale + 'px'
        gfx.canvas.style.width = newWidth
        gfx.canvas.style.height = newHeight
        scl = parseInt(newWidth) / baseW
        
        resizeCB?.()
    }
    
    rescale()
    window.onresize = gfx.canvas.onresize = rescale
    setInterval(rescale, 250)
    
    return {
        get right() {
            return gfx.canvas.width
        },
        get bottom() {
            return gfx.canvas.height
        },
        get scale() {
            return scl
        },
        set onResize(fn) {
            resizeCB = fn
        },
        refreshGFXSize() {
            baseW = gfx.canvas.width
            baseH = gfx.canvas.height
        }
    }
}

/** * Creates a depth render that sorts each draw call based on it's depth */
function installDepthRenderer() {
    const drawQueue = []
    
    return {
        queue(depth, call, ...args) {
            drawQueue.push([depth, call, args])
        },
        render() {
            drawQueue.sort((a, b) => a[0] - b[0])
            for (let i = 0; i < drawQueue.length; ) {
                const item = drawQueue.shift()
                if (item === undefined) continue
                item[1](...item[2])
            }
        }
    }
}

function installGridRenderer(grid, colorMappingRGBA) {
    if (colorMappingRGBA == null || typeof colorMappingRGBA !== 'object') {
        throw `Argument colorMappingRGBA of value ${colorMappingRGBA} is not compatible with grid renderer. Use an object literal instead.`
    }
    
    for (const key in colorMappingRGBA) {
        colorMappingRGBA[key] = colorParse(colorMappingRGBA[key]) ?? [
            0,
            255,
            0,
            255
        ]
    }
    
    const cv = document.createElement('canvas')
    cv.width = grid.x
    cv.height = grid.y
    let ctx = cv.getContext('2d', { willReadFrequently: true })
    
    return {
        canvas: cv,
        update() {
            ctx = this.canvas.getContext('2d', { willReadFrequently: true })
            if (ctx == null) return
            const imageData = ctx.getImageData(0, 0, grid.x, grid.y)
            const data = imageData.data
            grid.traverse((cell, x, y) => {
                // @ts-ignore
                const rgba = colorMappingRGBA[cell] ?? [255, 0, 0, 255]
                let i = (x + y * grid.x) << 2
                data[i] = rgba[0]
                data[++i] = rgba[1]
                data[++i] = rgba[2]
                data[++i] = rgba[3]
            })
            ctx.putImageData(imageData, 0, 0)
        }
    }
}

// TODO: installCamera should use the object this instead of the Function this
/**
* Creates a camera
* @param {CanvasRenderingContext2D} gfx - Rendering context to manage
* @param {number} x - X position of the camera's rendering area
* @param {number} y - Y position of the camera's rendering area
* @param {number} w - Width of the camera's rendering area
* @param {number} h - Height of the camera's rendering area
*/
function installCamera(gfx, x = 0, y = 0) {
    let a = 0
    let z = 1
    let target = null
    let stiffX = -0.3
    let stiffY = 0.3
    let fx = x
    let fy = y
    let lConstraint = null
    let rConstraint = null
    let tConstraint = null
    let bConstraint = null
    let offset = [0, 0]
    
    const _this = {
        get x() {
            return fx
        },
        set x(v) {
            fx = x = v
        },
        get y() {
            return fy
        },
        set y(v) {
            fy = y = v
        },
        get angle() {
            return a
        },
        set angle(v) {
            a = v
        },
        get zoom() {
            return z
        },
        set zoom(v) {
            z = min(max(v, 0.01), 100)
        },
        get stiffX() {
            return stiffX
        },
        set stiffX(v) {
            stiffX = min(max(v, 0), 1)
        },
        get stiffY() {
            return stiffY
        },
        set stiffY(v) {
            stiffY = min(max(v, 0), 1)
        },
        get offset() {
            return offset
        },
        set offset(v) {
            offset = v
        },
        looseX: 0,
        looseY: 0,
        clearColor: null,
        clearScreen: false,
        intPosition: false,
        background: null,
        bgParallax: [false, false],
        getBounding() {
            const topLeft = this.screenToWorld(0, 0)
            const bottomRight = this.screenToWorld(
                gfx.canvas.width,
                gfx.canvas.height
            )
            return {
                left: topLeft[0],
                top: topLeft[1],
                right: bottomRight[0],
                bottom: bottomRight[1]
            }
        },
        getBoundingRect() {
            const topLeft = this.screenToWorld(0, 0)
            const bottomRight = this.screenToWorld(
                gfx.canvas.width,
                gfx.canvas.height
            )
            return {
                x: topLeft[0],
                y: topLeft[1],
                w: bottomRight[0] - topLeft[0],
                h: bottomRight[1] - topLeft[1]
            }
        },
        // FIXME: Bagulho buga se a boundary nao couber na tela
        constrain(left, right, top, bottom) {
            lConstraint = left
            rConstraint = right
            tConstraint = top
            bConstraint = bottom
        },
        setLooseness(x, y = x) {
            this.looseX = x
            this.looseY = y
        },
        setStiffness(x, y = x) {
            stiffX = x
            stiffY = y
        },
        setPosition(px, py) {
            fx = x = px
            fy = y = py
        },
        screenToWorld(sx, sy) {
            return [
                (sx - gfx.canvas.width * 0.5) / z + fx,
                (sy - gfx.canvas.height * 0.5) / z + fy
            ]
        },
        worldToScreen(wx, wy) {
            return [
                (wx - fx) * z + gfx.canvas.width * 0.5,
                (wy - fy) * z + gfx.canvas.height * 0.5
            ]
        },
        centerAt(obj, autoUpdate = true) {
            x = obj.x + offset[0]
            y = obj.y + offset[1]
            
            if (autoUpdate) {
                fx = x
                fy = y
            }
        },
        follow(obj) {
            target = obj
            this.centerAt(obj)
        },
        stopFollow() {
            target = null
        },
        world(callback) {
            if (typeof callback !== 'function') return
            const t = gfx.getTransform()
            gfx.resetTransform()
            callback()
            gfx.setTransform(t)
        },
        update() {
            const ww = gfx.canvas.width
            const hh = gfx.canvas.height
            const w = ww * 0.5
            const h = hh * 0.5
            
            if (target) {
                const tx = target.x + offset[0]
                const ty = target.y + offset[1]
                const dx = tx - x
                const dy = ty - y
                // Camera only moves if target is not at the loose space (weird syntax)
                if (abs(dx) >= this.looseX)
                    x += (dx - this.looseX * sign(dx)) * abs(stiffX)
                if (abs(dy) >= this.looseY)
                    y += (dy - this.looseY * sign(dy)) * abs(stiffY)
                fx = x - (x - tx) + (x - tx) * mathSign(stiffX)
                fy = y - (y - ty) + (y - ty) * mathSign(stiffY)
            } else {
                fx = x
                fy = y
            }
            
            const boundaries = this.getBounding()
            
            if (lConstraint !== null && boundaries.left - lConstraint < 0)
                fx = lConstraint + w / this.zoom
            if (tConstraint !== null && boundaries.top - tConstraint < 0)
                fy = tConstraint + h / this.zoom
            if (rConstraint !== null && rConstraint - boundaries.right < 0)
                fx = rConstraint - w / this.zoom
            if (bConstraint !== null && bConstraint - boundaries.bottom < 0)
                fy = bConstraint - h / this.zoom
            
            if (this.intPosition) {
                fx = floor(fx)
                fy = floor(fy)
            }
        },
        beforeRender() {
            const ww = gfx.canvas.width
            const hh = gfx.canvas.height
            const w = ww * 0.5
            const h = hh * 0.5
            
            if (this.clearScreen) {
                if (this.clearColor) {
                    gfx.fillStyle = this.clearColor
                    gfx.fillRect(0, 0, ww, hh)
                } else gfx.clearRect(0, 0, ww, hh)
            }
            
            gfx.save()
            gfx.translate(w - fx * z + w * z, h - fy * z + h * z)
            if (a) gfx.rotate(a)
                gfx.translate(-w * z, -h * z)
            if (z !== 1) gfx.scale(z, z)
                
            if (this.clearScreen && this.background) {
                const boundaries = this.getBounding()
                
                const tl = [
                    this.background.width *
                    floor(boundaries.left / this.background.width),
                    this.background.height *
                    floor(boundaries.top / this.background.height)
                ]
                
                const br = [
                    this.background.width *
                    floor(boundaries.right / this.background.width),
                    this.background.height *
                    floor(boundaries.bottom / this.background.height)
                ]
                
                for (let y = tl[1]; y <= br[1]; y += this.background.height) {
                    for (let x = tl[0]; x <= br[0]; x += this.background.width) {
                        gfx.drawImage(this.background, x, y)
                    }
                }
            }
        },
        afterRender() {
            gfx.restore()
            gfx.resetTransform()
        }
    }
    
    return _this
}

function gfxCreateGraphic(w, h, cb, pixelArt = false) {
    const cnv = domCanvas(w, h)
    const ctx = cnv.getContext('2d')
    if (ctx == null) throw new Error('Could not get the 2D canvas context.')
        ctx.imageSmoothingEnabled = !pixelArt
    cb(ctx, w, h)
    return cnv
}

function gfxCreatePattern(w, h, cb, repetition = 'repeat', pixelArt = true) {
    const cnv = domCanvas(w, h)
    const ctx = cnv.getContext('2d')
    if (ctx == null) throw new Error('Could not get the 2D canvas context.')
        ctx.imageSmoothingEnabled = !pixelArt
    cb(ctx, w, h)
    return ctx.createPattern(cnv, repetition)
}

// #endregion

// #region Input

// TODO: improve performance?
// TODO: re-build as class
/** Installs a Keyboard and mouse handler
* @template KeyMap
* @param mapping - The key mapping object. Shall be provided in this way: { action: keysinlowercase[] }
* @param scr - Used to be a screen object which was used to scale the mouse positions properly. Now the scalling is calculated based on `el`
* @param el - The element in which the cursor handling should be applied to
*/
function installKBM(mapping, el = document.body) {
    if (typeof mapping === 'object' && mapping !== null) {
        for (const actionName in mapping) {
            mapping[actionName] = mapping[actionName].map(key => key.toLowerCase())
        }
    }
    
    let inputEvents = []
    
    let previous = {
        heldKeys: {},
        pressedKeys: {},
        releasedKeys: {},
        mouse: {
            x: 0,
            y: 0,
            z: 0,
            lmb: false,
            mmb: false,
            rmb: false,
            pressure: 0,
            movementX: 0,
            movementY: 0,
            rawMovementX: 0,
            rawMovementY: 0,
            movementFactor: 0.4,
            
            *[Symbol.iterator]() {
                yield this.x
                yield this.y
            }
        },
        lastKey: null
    }
    let heldKeys = {}
    let pressedKeys = {}
    let releasedKeys = {}
    let listeners = {
        keydown: [],
        keyup: [],
        mousedown: [],
        mouseup: [],
        mousemove: [],
        wheel: []
    }
    
    let _lastKey = null
    let mouse = {
        x: 0,
        y: 0,
        z: 0,
        lmb: false,
        mmb: false,
        rmb: false,
        pressure: 0,
        movementX: 0,
        movementY: 0,
        rawMovementX: 0,
        rawMovementY: 0,
        movementFactor: 0.4,
        isBounded: false,
        lmbDown() {
            return this.lmb && !previous.mouse?.lmb
        },
        mmbDown() {
            return this.mmb && !previous.mouse?.mmb
        },
        rmbDown() {
            return this.rmb && !previous.mouse?.rmb
        },
        lmbUp() {
            return !this.lmb && previous.mouse?.lmb
        },
        mmbUp() {
            return !this.mmb && previous.mouse?.mmb
        },
        rmbUp() {
            return !this.rmb && previous.mouse?.rmb
        },
        *[Symbol.iterator]() {
            yield this.x
            yield this.y
        }
    }
    
    let getKey, getKeyDown, getKeyUp
    
    if (mapping == null) {
        getKey = key => heldKeys[key.toLowerCase()] || false
        getKeyDown = key => pressedKeys[key.toLowerCase()] || false
        getKeyUp = key =>
            (!heldKeys[key.toLowerCase()] &&
        previous.heldKeys &&
        previous.heldKeys[key.toLowerCase()]) ||
        false
    } else {
        getKey = keyName =>
            mapping[keyName] != null &&
        mapping[keyName].some(k => objectKeys(heldKeys).some(hK => hK === k))
        getKeyDown = keyName =>
            mapping[keyName] != null &&
        mapping[keyName].some(k => objectKeys(pressedKeys).some(pK => pK === k))
        getKeyUp = keyName =>
            mapping[keyName] != null && previous.heldKeys
        ? !mapping[keyName].some(k =>
            objectKeys(heldKeys).some(hK => hK === k)
        ) &&
        mapping[keyName].some(k =>
            objectKeys(previous.heldKeys).some(phK => phK === k)
        )
        : false
    }
    
    let listenerId = 0
    
    /**
    * @template {keyof listeners} K
    * @param {K} eventName
    * @param {(event:GlobalEventHandlersEventMap[K]) => void} callback
    */
    const addListener = (eventName, callback) => {
        const listener = listeners[eventName]
        if (!listener) return null
        const id = objectKeys(listeners).indexOf(eventName) + '-' + listenerId++
        listener.push([id, callback])
        return id
    }
    
    const removeListener = id => {
        const key = id.split('-')[0]
        listeners[key].splice(
            listeners[key].findIndex(l => id === l[0]),
            1
        )
    }
    
    const next = () => {
        objectAssign(previous, {
            heldKeys,
            pressedKeys,
            releasedKeys,
            mouse: {},
            lastKey: _lastKey
        })
        
        const prevMouse = previous.mouse
        
        prevMouse.x = mouse.x
        prevMouse.y = mouse.y
        prevMouse.z = mouse.z
        prevMouse.lmb = mouse.lmb
        prevMouse.mmb = mouse.mmb
        prevMouse.rmb = mouse.rmb
        prevMouse.movementX = mouse.movementX
        prevMouse.movementY = mouse.movementY
        prevMouse.rawMovementX = mouse.rawMovementX
        prevMouse.rawMovementY = mouse.rawMovementY
        prevMouse.movementFactor = mouse.movementFactor
        
        mouse.movementX *= mouse.movementFactor
        mouse.movementY *= mouse.movementFactor
        mouse.rawMovementX = 0
        mouse.rawMovementY = 0
        
        for (let i = inputEvents.length - 1; i >= 0; i--) {
            if (!inputEvents[i]) continue
            inputEvents[i].timer--
            
            if (inputEvents[i].timer === 0) {
                inputEvents[i].event()
                delete inputEvents[i]
            }
        }
    }
    
    let offsetX = parseFloat(getComputedStyle(el).borderLeftWidth || '0')
    let offsetY = parseFloat(getComputedStyle(el).borderTopWidth || '0')
    
    const refresh = () => {
        offsetX = parseFloat(getComputedStyle(el).borderLeftWidth || '0')
        offsetY = parseFloat(getComputedStyle(el).borderTopWidth || '0')
    }
    
    setTimeout(refresh)
    
    next()
    
    const updateMousePos = e => {
        if (e == null || e.target == null) return
        const t = e.target
        const r = t.getBoundingClientRect()
        mouse.x = ((e.x - r.left - offsetX) / r.width) * (t.width ?? t.offsetWidth)
        mouse.y =
        ((e.y - r.top - offsetY) / r.height) * (t.height ?? t.offsetHeight)
    }
    
    const updatePressure = e => {
        mouse.pressure = e.pressure
    }
    
    document.addEventListener(
        'keydown',
        e => {
            try {
                const key = e.key.toLowerCase()
                listeners['keydown'].forEach(l => l[1](e, key))
                _lastKey =
                mapping == null
                ? key
                : objectKeys(mapping)[
                    objectValues(mapping).findIndex(m => {
                        if (isArray(m)) return m.includes(key)
                            return false
                    })
                ] ?? key
                
                if (!heldKeys[key]) pressedKeys[key] = true
                heldKeys[key] = true
                
                inputEvents.push({ timer: 1, event: () => delete pressedKeys[key] })
            } catch (err) {
                console.error(err, e)
            }
        },
        true
    )
    
    document.addEventListener(
        'keyup',
        e => {
            try {
                const key = e.key.toLowerCase()
                listeners['keyup'].forEach(l => l[1](e, key))
                
                delete heldKeys[key]
                releasedKeys[key] = true
                
                inputEvents.push({ timer: 1, event: () => delete releasedKeys[key] })
            } catch (err) {
                console.error(err, e)
            }
        },
        true
    )
    
    el.addEventListener('pointerdown', updatePressure)
    el.addEventListener('pointermove', updatePressure)
    el.addEventListener('pointerup', updatePressure)
    
    el.addEventListener(
        'mousemove',
        e => {
            try {
                updateMousePos(e)
                mouse.movementX = mouse.rawMovementX += e.movementX
                mouse.movementY = mouse.rawMovementY += e.movementY
                // mouse.pressure = e.pressure
                listeners['mousemove'].forEach(l => l[1](e, mouse))
            } catch (err) {
                console.error('Cursor position could not be read.', err)
            }
            e.preventDefault()
        },
        true
    )
    
    el.addEventListener(
        'mousedown',
        e => {
            try {
                updateMousePos(e)
                mouse.lmb = mouse.lmb || (e.buttons & 1) >> 0 === 1
                mouse.rmb = mouse.rmb || (e.buttons & 2) >> 1 === 1
                mouse.mmb = mouse.mmb || (e.buttons & 4) >> 2 === 1
                // mouse.pressure = e.pressure
                listeners['mousedown'].forEach(l => l[1](e, mouse))
            } catch (err) {
                console.error(err, e)
            }
            e.preventDefault()
        },
        true
    )
    
    el.addEventListener(
        'mouseup',
        e => {
            try {
                updateMousePos(e)
                let lmb = (mouse.lmb = (e.buttons & 1) >> 0 === 1)
                let rmb = (mouse.rmb = (e.buttons & 2) >> 1 === 1)
                let mmb = (mouse.mmb = (e.buttons & 4) >> 2 === 1)
                mouse.pressure = 0
                listeners['mouseup'].forEach(l => l[1](e, mouse))
                
                inputEvents.push({
                    timer: 1,
                    event: () => {
                        mouse.lmb = lmb
                        mouse.rmb = rmb
                        mouse.mmb = mmb
                    }
                })
                
                // setTimeout(() => {
                    //    mouse.lmb = lmb
                //    mouse.rmb = rmb
                //    mouse.mmb = mmb
                // })
            } catch (err) {
                console.error(err, e)
            }
            e.preventDefault()
        },
        true
    )
    
    el.addEventListener('mouseenter', e => {
        mouse.isBounded = true
    })
    el.addEventListener('mouseleave', e => {
        mouse.isBounded = false
    })
    el.addEventListener(
        'wheel',
        e => {
            try {
                updateMousePos(e)
                mouse.z = e.deltaY
                inputEvents.push({ timer: 1, event: () => (mouse.z = 0) })
                listeners['wheel'].forEach(l => l[1](e, mouse))
            } catch (err) {
                console.error(err, e)
            }
            e.preventDefault()
        },
        true
    )
    
    return {
        mouse,
        previous,
        heldKeys,
        pressedKeys,
        releasedKeys,
        getKey(key) {
            return getKey(key)
        },
        getKeyDown(key) {
            return getKeyDown(key)
        },
        getKeyUp(key) {
            return getKeyUp(key)
        },
        setMapping(m) {
            mapping = m
        },
        get lastKey() {
            return _lastKey
        },
        set lastKey(v) {
            _lastKey = v
        },
        addListener,
        removeListener,
        next,
        refresh
    }
}

/**
* Installs a Gamepad handler for mobile
* @param {ReturnType<typeof installGFX>} gfx - Context to be handled
*/
function installMobileGP(gfx) {
    const canvas = gfx.canvas
    if (!canvas)
        throw new Error(
        'Mobile gamepad requires a CanvasRenderingContext2D to work. Instead, got: ' +
        gfx
    )
    
    const buttons = new Map()
    const buttonsDown = new Set()
    const pButtonsDown = new Set()
    const joysticks = new Map()
    const dPads = new Map()
    const dPadDirs = [
        0,
        QUARTER_PI,
        HALF_PI,
        QUARTER_PI + HALF_PI,
        PI,
        -QUARTER_PI,
        -HALF_PI,
        -QUARTER_PI - HALF_PI
    ]
    const touches = new Map()
    
    // Updates all button and joystick states
    const updateComponents = eventName => {
        const w = canvas.width
        const h = canvas.height
        const mwh = min(w, h)
        
        // Update button states
        buttons.forEach(btn => buttonsDown.delete(btn.label))
        
        for (const btn of buttons.values()) {
            if (btn.disabled) continue
            
            const x = btn.x * w + btn.relX * mwh
            const y = btn.y * h + btn.relY * mwh
            const s = btn.size * mwh
            
            let mTouch = touches.get(btn.touchId)
            
            if (!mTouch) {
                btn.touchId = null
                
                if (eventName === 'mousedown') {
                    for (const touch of touches.values()) {
                        if (mathDist2(x, y, touch.x0, touch.y0) > s * s) continue
                        btn.touchId = touch.id
                        mTouch = touch
                        break
                    }
                }
            }
            
            if (!mTouch) continue
            
            buttonsDown.add(btn.label)
        }
        
        // Update joystick states
        for (const stick of joysticks.values()) {
            if (stick.disabled) continue
            
            stick.position.x = 0
            stick.position.y = 0
            const x = stick.x * w
            const y = stick.y * h
            const r = stick.radius * mwh
            
            let mTouch = touches.get(stick.touchId)
            
            if (!mTouch) {
                stick.touchId = null
                
                if (eventName === 'mousedown') {
                    for (const touch of touches.values()) {
                        if (mathDist2(x, y, touch.x0, touch.y0) > r * r) continue
                        stick.touchId = touch.id
                        mTouch = touch
                        break
                    }
                }
            }
            
            if (!mTouch) continue
            
            const pos = vecLimit([(mTouch.x - x) / r, (mTouch.y - y) / r], 1)
            stick.position.x = pos[0]
            stick.position.y = pos[1]
        }
        
        // Update dPad states
        for (const dPad of dPads.values()) {
            if (dPad.disabled) continue
            
            dPad.position.x = 0
            dPad.position.y = 0
            const x = dPad.x * w
            const y = dPad.y * h
            const s = dPad.size * mwh
            
            let mTouch = touches.get(dPad.touchId)
            
            if (!mTouch) {
                dPad.touchId = null
                
                if (eventName === 'mousedown') {
                    for (const touch of touches.values()) {
                        if (mathDist2(x, y, touch.x0, touch.y0) > s * s) continue
                        dPad.touchId = touch.id
                        mTouch = touch
                        break
                    }
                }
            }
            
            if (!mTouch) continue
            
            const pos = vecFromAngle(
                -mathSnap(vecHeading([mTouch.x - x, mTouch.y - y]), dPadDirs),
                1
            )
            dPad.position.x = pos[0]
            dPad.position.y = pos[1]
        }
    }
    
    let offsetX = parseFloat(getComputedStyle(canvas).borderLeftWidth || '0')
    let offsetY = parseFloat(getComputedStyle(canvas).borderTopWidth || '0')
    
    const getPointerPosition = e => {
        const t = e.target
        if (t == null) return { x: -1, y: -1 }
        const rect = t.getBoundingClientRect()
        return {
            x: ((e.x - rect.left - offsetX) / rect.width) * t.width,
            y: ((e.y - rect.top - offsetY) / rect.height) * t.height
        }
    }
    
    canvas.addEventListener('pointerdown', e => {
        const { x, y } = getPointerPosition(e)
        touches.set(e.pointerId, { id: e.pointerId, x0: x, y0: y, x: x, y: y })
        updateComponents('mousedown')
    })
    
    canvas.addEventListener('pointermove', e => {
        const { x, y } = getPointerPosition(e)
        touches.set(e.pointerId, { id: e.pointerId, x0: x, y0: y, x: x, y: y })
        updateComponents('mousemove')
    })
    
    canvas.addEventListener('pointerup', e => {
        touches.delete(e.pointerId)
        updateComponents('mouseup')
    })
    
    canvas.addEventListener('pointercancel', e => {
        touches.delete(e.pointerId)
        updateComponents('mouseup')
    })
    
    return {
        opacity: 0.5,
        lineWeight: 2,
        color: '#fff',
        addButton(
            label,
            x,
            y,
            relX = 0,
            relY = 0,
            size = 0.08,
            { visible = true, disabled = false, showLabel = true } = {}
        ) {
            const btn = {
                label,
                x,
                y,
                relX,
                relY,
                visible,
                disabled,
                size,
                showLabel,
                touchId: null
            }
            buttons.set(label, btn)
            return btn
        },
        addJoystick(
            label,
            x,
            y,
            radius = 0.16,
            size = 0.08,
            { visible = true, disabled = false, showLabel = false } = {}
        ) {
            const stick = {
                label,
                x,
                y,
                radius,
                visible,
                disabled,
                size,
                showLabel,
                touchId: null,
                position: { x: 0, y: 0 }
            }
            joysticks.set(label, stick)
            return stick
        },
        addDPad(
            label,
            x,
            y,
            size = 0.16,
            { visible = true, disabled = false, showLabel = false } = {}
        ) {
            const dPad = {
                label,
                x,
                y,
                visible,
                disabled,
                size,
                showLabel,
                touchId: null,
                position: { x: 0, y: 0 }
            }
            dPads.set(label, dPad)
            return dPad
        },
        hideButton(label) {
            const btn = buttons.get(label)
            if (btn) btn.visible = false
        },
        showButton(label) {
            const btn = buttons.get(label)
            if (btn) btn.visible = true
        },
        toggleButton(label, bool) {
            const btn = buttons.get(label)
            if (btn) btn.visible = bool ?? !btn.visible
        },
        disableButton(label) {
            const btn = buttons.get(label)
            if (btn) btn.disabled = true
        },
        enableButton(label) {
            const btn = buttons.get(label)
            if (btn) btn.disabled = false
        },
        getButton(label) {
            return buttonsDown.has(label)
        },
        getButtonDown(label) {
            return !pButtonsDown.has(label) && buttonsDown.has(label)
        },
        getButtonUp(label) {
            return !buttonsDown.has(label) && pButtonsDown.has(label)
        },
        next() {
            pButtonsDown.forEach(label => pButtonsDown.delete(label))
            buttonsDown.forEach(label => pButtonsDown.add(label))
        },
        refresh() {
            // scale = canvas instanceof HTMLCanvasElement ? canvas.width / parseFloat(canvas.style.width || canvas.width) : scr ? scr.scale : 1
            offsetX = parseFloat(getComputedStyle(canvas).borderLeftWidth || '0')
            offsetY = parseFloat(getComputedStyle(canvas).borderTopWidth || '0')
        },
        render() {
            const _fStyle = gfx.fillStyle
            const _sStyle = gfx.strokeStyle
            const _tAlign = gfx.textAlign
            const _tBLine = gfx.textBaseline
            const _gAlpha = gfx.globalAlpha
            const _lWidth = gfx.lineWidth
            const _font = gfx.font
            
            const w = canvas.width
            const h = canvas.height
            const mwh = min(w, h)
            gfx.globalAlpha = this.opacity
            gfx.lineWidth = this.lineWeight
            
            // Render buttons
            for (const btn of buttons.values()) {
                if (!btn.visible) continue
                
                const x = btn.x * w + btn.relX * mwh
                const y = btn.y * h + btn.relY * mwh
                const s = btn.size * mwh
                
                if (btn.disabled) gfx.globalAlpha = this.opacity * 0.5
                
                gfx.fillStyle = gfx.strokeStyle = this.color
                gfx.beginPath()
                gfx.arc(x, y, s, 0, TWO_PI)
                gfx.stroke()
                
                if (buttonsDown.has(btn.label)) {
                    gfx.globalAlpha *= 0.8
                    gfx.fill()
                    gfx.globalAlpha = this.opacity
                }
                
                if (!btn.showLabel) continue
                
                gfx.textAlign = 'center'
                gfx.textBaseline = 'middle'
                gfx.font = s / btn.label.length - 2 + 'px monospace'
                gfx.fillText(btn.label, x, y)
            }
            
            // Render joysticks
            gfx.globalAlpha = this.opacity
            gfx.lineWidth = this.lineWeight
            
            for (const stick of joysticks.values()) {
                if (!stick.visible) continue
                
                const x = stick.x * w
                const y = stick.y * h
                const s = stick.size * mwh
                const r = stick.radius * mwh
                const dx = x + stick.position.x * r
                const dy = y + stick.position.y * r
                
                if (stick.disabled) gfx.globalAlpha *= 0.5
                
                gfx.fillStyle = gfx.strokeStyle = this.color
                gfx.beginPath()
                gfx.arc(x, y, r, 0, TWO_PI)
                gfx.stroke()
                
                gfx.beginPath()
                gfx.globalAlpha *= 0.8
                gfx.arc(dx, dy, s, 0, TWO_PI)
                gfx.fill()
                
                if (!stick.showLabel) continue
                
                gfx.textAlign = 'center'
                gfx.textBaseline = 'middle'
                gfx.font = s / stick.label.length - 2 + 'px monospace'
                gfx.fillText(stick.label, x, y)
            }
            
            // Render dPads
            gfx.globalAlpha = this.opacity
            gfx.lineWidth = this.lineWeight
            
            for (const dPad of dPads.values()) {
                if (!dPad.visible) continue
                
                const x = dPad.x * w
                const y = dPad.y * h
                const s = dPad.size * mwh
                const dx = x + dPad.position.x * s * 0.5
                const dy = y + dPad.position.y * s * 0.5
                
                if (dPad.disabled) gfx.globalAlpha *= 0.5
                
                gfx.fillStyle = gfx.strokeStyle = this.color
                gfx.beginPath()
                gfx.arc(x, y, s, 0, TWO_PI)
                gfx.stroke()
                
                gfx.beginPath()
                gfx.globalAlpha *= 0.8
                gfx.arc(dx, dy, s * 0.5, 0, TWO_PI)
                gfx.fill()
                
                if (!dPad.showLabel) continue
                
                gfx.textAlign = 'center'
                gfx.textBaseline = 'middle'
                gfx.font = s / dPad.label.length - 2 + 'px monospace'
                gfx.fillText(dPad.label, x, y)
            }
            
            gfx.fillStyle = _fStyle
            gfx.strokeStyle = _sStyle
            gfx.textAlign = _tAlign
            gfx.textBaseline = _tBLine
            gfx.globalAlpha = _gAlpha
            gfx.lineWidth = _lWidth
            gfx.font = _font
        }
    }
}

/**
* Installs a Device Motion handler
* @param historyLength - The length of the motionData history used by the averageMotionData calculation
*/
function installMotionHandler(historyLength = 8) {
    const motionData = {
        accX: 0,
        accY: 0,
        accZ: 0,
        alpha: 0,
        beta: 0,
        gamma: 0,
        lastUpdate: 0
    }
    
    const motionDataHistory = []
    const intMotionData = objectAssign({}, motionData)
    const averageMotionData = objectAssign({}, motionData)
    
    window.addEventListener('devicemotion', e => {
        motionData.accX = e.acceleration?.x ?? 0
        motionData.accY = e.acceleration?.y ?? 0
        motionData.accZ = e.acceleration?.z ?? 0
        motionData.alpha = e.rotationRate?.alpha ?? 0
        motionData.beta = e.rotationRate?.beta ?? 0
        motionData.gamma = e.rotationRate?.gamma ?? 0
        
        intMotionData.accX = floor(e.acceleration?.x ?? 0)
        intMotionData.accY = floor(e.acceleration?.y ?? 0)
        intMotionData.accZ = floor(e.acceleration?.z ?? 0)
        intMotionData.alpha = floor(e.rotationRate?.alpha ?? 0)
        intMotionData.beta = floor(e.rotationRate?.beta ?? 0)
        intMotionData.gamma = floor(e.rotationRate?.gamma ?? 0)
        
        const len = motionDataHistory.length
        motionDataHistory.push(objectValues(motionData))
        if (len > historyLength) motionDataHistory.shift()
            
        let accXSum = 0
        let accYSum = 0
        let accZSum = 0
        let alphaSum = 0
        let betaSum = 0
        let gammaSum = 0
        
        for (const record of motionDataHistory) {
            accXSum += record[0]
            accYSum += record[1]
            accZSum += record[2]
            alphaSum += record[3]
            betaSum += record[4]
            gammaSum += record[5]
        }
        
        averageMotionData.accX = floor(accXSum / len)
        averageMotionData.accY = floor(accYSum / len)
        averageMotionData.accZ = floor(accZSum / len)
        averageMotionData.alpha = floor(alphaSum / len)
        averageMotionData.beta = floor(betaSum / len)
        averageMotionData.gamma = floor(gammaSum / len)
        averageMotionData.lastUpdate = intMotionData.lastUpdate = motionData.lastUpdate =
        e.timeStamp
    })
    
    return {
        motionData,
        intMotionData,
        averageMotionData
    }
}

// TODO: Make it compatible with other browsers
async function inputToClipboard(txt) {
    if (navigator?.clipboard) return navigator.clipboard.writeText(txt)
    }

async function inputGetFile(type = 'all') {
    return new Promise((res, rej) => {
        const backdrop = domDiv(`  
 position: fixed;
 top: 0;
 left: 0;
 width: 100vw;
 height: 100vh;
 z-index: 20000;
 background: #000d;
 color: #fff;
 display: flex;
 align-items: center;
 justify-content: center;
 font: 48px sans-serif;`,
            { append: document.body }
        )
        
        backdrop.innerText = 'Select an Image'
        
        const el = domElement('input', { append: backdrop })
        el.oncancel = () => backdrop.remove()
        
        switch (type) {
            case 'image':
            el.accept = 'image/*'
            break
            case 'video':
            el.accept = 'video/*'
            break
            case 'text':
            el.accept = 'text/*'
            break
            case 'json':
            el.accept = 'application/JSON'
            break
            case 'all':
            el.accept = '*'
            break
            default:
            el.accept = type
        }
        
        el.type = 'file'
        // @ts-ignore
        el.style = `
 position: fixed;
 opacity: 0;
 width: 100%;
 height: 100%;`
        
        el.click()
        
        el.onchange = async () => {
            const fr = new FileReader()
            // @ts-ignore
            fr['readAs' + (type === 'text' ? 'Text' : 'DataURL')](el.files[0])
            
            switch (type) {
                case 'image':
                fr.onloadend = async () => res(await loadImage(fr.result))
                break
                // TODO: is my typing wrong?
                // @ts-ignore
                case 'video':
                fr.onloadend = async () => res(domVideo(fr.result))
                break
                case 'text':
                fr.onloadend = async () => res(fr.result)
                break
                case 'json':
                fr.onloadend = async () => res(JSON.parse(fr.result))
                break
                default:
                fr.onloadend = async () => res(fr.result)
            }
            
            backdrop.remove()
        }
    })
}

async function inputGetText(text, forceful = false) {
    return new Promise((res, rej) => {
        const modalEl = domDiv('', {
            classes: ['rai-modal'],
            append: document.body
        })
        modalEl.innerHTML = `
 <div class='modal-body'>
    <input placeholder='${text}' type='text' required='${forceful}'>
    <button>OK</button>
 </div>`
        
        // @ts-ignore
        const inputEl = modalEl.querySelector('input')
        
        const click = () => {
            // @ts-ignore
            const value = inputEl.value.trim()
            if (!value && forceful) return ''
            modalEl.remove()
            res(value)
        }
        
        // @ts-ignore
        modalEl.querySelector('button').onclick = click
        // @ts-ignore
        inputEl.addEventListener('keydown', e => e.key === 'Enter' && click())
        // @ts-ignore
        setTimeout(() => inputEl.focus())
    })
}

// #endregion

// #region File

// TODO: Make it so ext will change the type of the Blob instead of it being passed by the user
function fileDownload(
    name,
    ext = 'txt',
    data,
    type = 'text/plain;charset=utf-8'
) {
    const a = document.createElement('a')
    const file = new Blob([data], { type })
    a.href = URL.createObjectURL(file)
    a.download = `${name}.${ext}`
    a.click()
    URL.revokeObjectURL(a.href)
}

async function fileLoadImage(file) {
    const fr = new FileReader()
    fr.readAsDataURL(file)
    return new Promise((res, rej) => {
        if (fr.result == null) return res(null)
            fr.onloadend = async () => res(await loadImage(fr.result))
        fr.onerror = rej
    })
}

async function fileLoadVideo(file) {
    const fr = new FileReader()
    fr.readAsDataURL(file)
    return new Promise((res, rej) => {
        fr.onloadend = async () => {
            if (fr.result == null) return res(null)
                const vid = domVideo()
            vid.src = fr.result
            res(vid)
        }
        fr.onerror = rej
    })
}

async function fileLoadText(file) {
    const fr = new FileReader()
    fr.readAsText(file)
    return new Promise((res, rej) => {
        fr.onloadend = () => res(fr.result)
        fr.onerror = rej
    })
}

async function fileLoadJSON(file) {
    const fr = new FileReader()
    fr.readAsText(file)
    return new Promise((res, rej) => {
        if (fr.result == null) return res(null)
            fr.onloadend = () => res(JSON.parse(fr.result))
        fr.onerror = rej
    })
}

// #endregion

// #region Audio

const _currAudios = []

function sfxPlay(audio, volume = 1, speed = 1, newInstance = false) {
    try {
        if (typeof audio === 'string') audio = new Audio(audio)
            else {
            if (newInstance) audio = new Audio(audio.src)
                
            audio.volume = volume
            audio.playbackRate = speed
            audio.play()
            _currAudios.push(audio)
            return audio
        }
    } catch {}
}

function sfxStop(i = _currAudios.length - 1) {
    _currAudios[i].pause()
    _currAudios.splice(i, 1)
}

function sfxStopAll() {
    while (_currAudios) sfxStop()
    }

function sfxPause(i) {
    if (i != null) return _currAudios[i].pause()
        for (let i = _currAudios.length - 1; i >= 0; i--)
            if (!_currAudios[i].paused) return _currAudios[i].pause()
            }

function sfxPauseAll() {
    for (const a of _currAudios) a.pause()
    }

function sfxResume(i) {
    if (i != null) return _currAudios[i].play()
        for (let i = 0; i < _currAudios.length; i++)
            if (_currAudios[i].paused) return _currAudios[i].play()
            }

function sfxResumeAll() {
    for (const a of _currAudios) a.play()
    }

// #endregion

// #region Collision

// TODO: implement (probably gonna ignore)
function meetPointRect(x1, y1, x2, y2, w, h) {
    throw 'Not implemented yet.'
}

/** Checks if a point intersects a rect */
function meetPointRectBool(px, py, x, y, w, h) {
    return px >= x && px <= x + w && py >= y && py <= y + h
}

// TODO: implement (probably gonna ignore)
function meetRectRect(x1, y1, w1, h1, x2, y2, w2, h2) {
    throw 'Not implemented yet.'
}

/** Checks if two rects are intersecting */
function meetRectRectBool(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 + w1 > x2 && x1 < x2 + w2 && y1 + h1 > y2 && y1 < y2 + h2
}

// TODO: implement (probably gonna ignore)
function meetRectCircle(rx, ry, w, h, cx, cy, r) {
    throw 'Not implemented yet.'
}

/** Checks if a rect intersects a circle */
function meetRectCircleBool(rx, ry, w, h, cx, cy, r) {
    return meetPointCircleBool(
        mathClamp(cx, rx, rx + w),
        mathClamp(cy, ry, ry + h),
        cx,
        cy,
        r
    )
}

/** Checks if a rect intersects a triangle */
function meetRectTriangleBool(x, y, w, h, tx1, ty1, tx2, ty2, tx3, ty3) {
    // Check if any shape contains the other
    const tMinX = min(tx1, tx2, tx3)
    const tMinY = min(ty1, ty2, ty3)
    if (
        !meetRectRectBool(
            x,
            y,
            w,
            h,
            tMinX,
            tMinY,
            max(tx1, tx2, tx3) - tMinX,
            max(ty1, ty2, ty3) - tMinY
        )
    )
    return false
    if (meetPointTriangleBool(x, y, tx1, ty1, tx2, ty2, tx3, ty3)) return true
    if (meetPointRectBool(tx1, ty1, x, y, w, h)) return true
    
    // Go through each possible side x side intersection
    const rLines = [
        [x, y, x + w, y],
        [x, y, x, y + h],
        [x + w, y, x, y + h],
        [x, y + h, x + w, y]
    ]
    const tLines = [
        [tx1, ty1, tx2, ty2],
        [tx2, ty2, tx3, ty3],
        [tx3, ty3, tx1, ty1]
    ]
    for (let q = 0; q < 4; q++) {
        const qLine = rLines[q]
        for (let t = 0; t < 3; t++) {
            const tLine = tLines[t]
            if (
                meetLineLineBool(
                    qLine[0],
                    qLine[1],
                    qLine[2],
                    qLine[3],
                    tLine[0],
                    tLine[1],
                    tLine[2],
                    tLine[3]
                )
            ) {
                return true
            }
        }
    }
    
    return false
}

/** Checks if a rect intersects a diamond shape */
function meetRectDiamondBool(rx, ry, rw, rh, dx, dy, dw, dh) {
    return (
        meetRectTriangleBool(
            rx,
            ry,
            rw,
            rh,
            dx - dw,
            dy,
            dx,
            dy - dh,
            dx + dw,
            dy
        ) ||
        meetRectTriangleBool(rx, ry, rw, rh, dx - dw, dy, dx, dy + dh, dx + dw, dy)
    )
}

/** If there is an intersection, it's info will be returned, false will be returned otherwise  */
function meetPointCircle(px, py, cx, cy, r) {
    if (!meetPointRectBool(px, py, cx - r, cy - r, 2 * r, 2 * r)) return false
    if ((px - cx) * (px - cx) + (py - cy) * (py - cy) < r * r) {
        return {
            angle: mathPointTo(px, py, cx, cy),
            overlap: { x: abs(cx - px), y: abs(cy - py) }
        }
    }
}

/** Checks if a point intersects a circle */
function meetPointCircleBool(px, py, cx, cy, r) {
    return (px - cx) * (px - cx) + (py - cy) * (py - cy) < r * r
}

// @DEPRECATED: function meetPointCircle2Bool(x1: number, y1: number, x2: number, y2: number, r: number)

// http://www.csharphelper.com/howtos/howto_circle_circle_intersection.html
/** Checks if two circles are intersecting and returns the two intersecting points */
function meetCircleCircle(x1, y1, r1, x2, y2, r2) {
    // Find the distance between the centers
    const dist2 = (x1 - x2) ** 2 + (y1 - y2) ** 2
    if (
        dist2 > (r1 + r2) ** 2 ||
        dist2 < abs(r1 - r2) ** 2 ||
        (dist2 === 0 && r1 === r2)
    )
    return []
    const dist = sqrt(dist2)
    
    // Find a, h and p2
    let a = (r1 * r1 - r2 * r2 + dist * dist) / (2 * dist)
    let h = sqrt(r1 * r1 - a * a)
    let cx2 = x1 + (a * (x2 - x1)) / dist
    let cy2 = y1 + (a * (y2 - y1)) / dist
    
    return [
        [cx2 + (h * (y2 - y1)) / dist, cy2 - (h * (x2 - x1)) / dist],
        [cx2 - (h * (y2 - y1)) / dist, cy2 + (h * (x2 - x1)) / dist]
    ]
}

function meetCircleCircleBool(x1, y1, r1, x2, y2, r2) {
    return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) < (r1 + r2) * (r1 + r2)
}

// DEPRECATED: function meetCircleCircle2Bool(x1: number, y1: number, r1: number, x2: number, y2: number, r2)

// https://stackoverflow.com/a/9755252
function meetPointTriangleBool(px, py, x1, y1, x2, y2, x3, y3) {
    const as_x = px - x1
    const as_y = py - y1
    const s_ab = (x2 - x1) * as_y - (y2 - y1) * as_x > 0
    
    if ((x3 - x1) * as_y - (y3 - y1) * as_x > 0 == s_ab) return false
    if ((x3 - x2) * (py - y2) - (y3 - y2) * (px - x2) > 0 != s_ab) return false
    
    return true
}

function meetPointQuadBool(px, py, x1, y1, x2, y2, x3, y3, x4, y4) {
    return (
        meetPointTriangleBool(px, py, x1, y1, x2, y2, x3, y3) ||
        meetPointTriangleBool(px, py, x1, y1, x3, y3, x4, y4)
    )
}

// https://ideone.com/PnPJgb
function meetLineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
    const CmP = [x3 - x1, y3 - y1]
    const r = [x2 - x1, y2 - y1]
    const s = [x4 - x3, y4 - y3]
    
    const CmPxr = CmP[0] * r[1] - CmP[1] * r[0]
    const CmPxs = CmP[0] * s[1] - CmP[1] * s[0]
    const rxs = r[0] * s[1] - r[1] * s[0]
    
    if (CmPxr === 0) return null
    if (rxs === 0) return null
    
    const rxsr = 1 / rxs
    const t = CmPxs * rxsr
    const u = CmPxr * rxsr
    
    if (!(t >= 0 && t <= 1 && u >= 0 && u <= 1)) return null
    
    return {
        x: x1 + (x2 - x1) * t,
        y: y1 + (y2 - y1) * t,
        t,
        u
    }
}

// https://ideone.com/PnPJgb
function meetLineLineBool(x1, y1, x2, y2, x3, y3, x4, y4) {
    const CmP = [x3 - x1, y3 - y1]
    const r = [x2 - x1, y2 - y1]
    const s = [x4 - x3, y4 - y3]
    
    const CmPxr = CmP[0] * r[1] - CmP[1] * r[0]
    const CmPxs = CmP[0] * s[1] - CmP[1] * s[0]
    const rxs = r[0] * s[1] - r[1] * s[0]
    
    if (CmPxr == 0)
        return x3 - x1 < 0 != x3 - x2 < 0 || y3 - y1 < 0 != y3 - y2 < 0
    if (rxs == 0) return false
    
    const rxsr = 1 / rxs
    const t = CmPxs * rxsr
    const u = CmPxr * rxsr
    
    return t >= 0 && t <= 1 && u >= 0 && u <= 1
}

// #endregion

// #region Loaders

/** Loads a script from local `src` or url */
async function loadScript(src) {
    return new Promise((res, rej) => {
        const scr = document.createElement('script')
        scr.crossOrigin = ''
        scr.src = src
        scr.defer = true
        scr.onload = () => res(scr)
        scr.onerror = rej
        document.head.append(scr)
    })
}

/** Loads a script from local `src` or url using **callbacks** */
function loadScriptCB(src, cb, err) {
    if (!cb) throw 'loadScriptCB requires a callback function as parameter.'
    const scr = document.createElement('script')
    scr.crossOrigin = ''
    scr.src = src
    scr.defer = true
    scr.onload = () => cb(scr)
    scr.onerror = err
    document.head.append(scr)
}

/** Loads an image from local `src` or url */
async function loadImage(src) {
    return new Promise((res, rej) => {
        let img = new Image()
        img.crossOrigin = ''
        img.src = src
        img
        .decode()
        .then(() => res(img))
        .catch(rej)
    })
}

/** Loads an image from local `src` or url using **callbacks** */
function loadImageCB(src, cb, err) {
    if (!cb) throw 'loadImageCB requires a callback function as parameter.'
    let img = new Image()
    img.src = src
    img.crossOrigin = ''
    img
    .decode()
    .then(() => cb(img))
    .catch(err)
}

/** Loads an audio and waits for it to load */
async function loadAudio(src) {
    const audio = new Audio(src)
    return new Promise((res, rej) => {
        audio.onloadeddata = () => res(audio)
        audio.onerror = rej
    })
}

/** Loads an audio and waits for it to load using **callbacks** */
function loadAudioCB(src, cb, err) {
    const audio = new Audio(src)
    audio.onloadeddata = () => cb(audio)
    audio.onerror = err
}

/** Loads a video from a `stream` object */
async function loadVideo(stream) {
    let vid = domVideo()
    if (typeof stream === 'string') {
        vid.src = stream
        return new Promise((res, rej) => {
            vid.onerror = rej
            vid.onloadeddata = () => res(vid)
        })
    } else {
        vid.srcObject = stream
        return new Promise((res, rej) => {
            vid.onerror = rej
            vid.onloadeddata = () => {
                vid.width = vid.videoWidth
                vid.height = vid.videoHeight
                res(vid)
            }
        })
    }
}

/** Loads a video from a `stream` object using **callbacks** */
function loadVideoCB(stream, cb, err) {
    if (!cb) throw 'loadVideoCB requires a callback function as parameter.'
    const vid = domVideo()
    vid.srcObject = stream
    vid.onerror = err
    vid.onloadeddata = () => {
        vid.width = vid.videoWidth
        vid.height = vid.videoHeight
        vid.play()
        cb(vid)
    }
}

/** Loads the user's webcam */
async function loadWebcam(cstr = { video: true, audio: true }) {
    return new Promise(async (res, rej) => {
        if (!(typeof navigator?.mediaDevices?.getUserMedia === 'function'))
            return rej('Instance does not have access to user media')
        
        navigator.mediaDevices
        .getUserMedia(cstr)
        .then(async stream => res(await loadVideo(stream)))
        .catch(rej)
    })
}

/** Loads the user's webcam using **callbacks** */
function loadWebcamCB(cstr = { video: true, audio: true }, cb, err) {
    if (!cb) throw 'loadWebcamCB requires a callback function as parameter.'
    if (!(typeof navigator?.mediaDevices?.getUserMedia === 'function'))
        return err?.('Instance does not have access to user media.')
    
    navigator.mediaDevices
    .getUserMedia(cstr)
    .then(stream => loadVideoCB(stream, cb, err))
    .catch(err)
}

/** Loads a JSON file from local `src` or url */
async function loadJSON(src) {
    return new Promise((res, rej) => {
        fetch(src)
        .then(async data => res(await data.json()))
        .catch(rej)
    })
}

/** Loads a JSON file from local `src` or url using **callbacks** */
function loadJSONCB(src, cb, err) {
    if (!cb) throw 'loadJSONCB requires a callback function as parameter.'
    fetch(src)
    .then(async data => cb(await data.json()))
    .catch(err)
}

/** Loads an utf-8 txt file from local `src` or url */
async function loadText(src) {
    return new Promise((res, rej) => {
        fetch(src)
        .then(async data => res(await data.text()))
        .catch(rej)
    })
}

/** Loads an utf-8 txt file from local `src` or url using **callbacks** */
function loadTextCB(src, cb, err) {
    if (!cb) throw 'loadTextCB requires a callback function as parameter.'
    fetch(src)
    .then(async data => cb(await data.text()))
    .catch(err)
}

/** Loads an `encoding` encoded txt file from local `src` or url */
async function loadTextEncoded(src, encoding = 'windows-1252') {
    return new Promise((res, rej) => {
        fetch(src)
        .then(async data => await data.arrayBuffer())
        .then(buffer => res(new TextDecoder(encoding).decode(buffer)))
        .catch(rej)
    })
}

/** Loads an `encoding` encoded txt file from local `src` or url using **callbacks** */
function loadTextEncodedCB(src, encoding = 'windows-1252', cb, err) {
    if (!cb) throw 'loadTextEncodedCB requires a callback function as parameter.'
    fetch(src)
    .then(async data => await data.arrayBuffer())
    .then(buffer => cb(new TextDecoder(encoding).decode(buffer)))
    .catch(err)
}

// #endregion

// #region DOM

function $(selector) {
    return document.querySelector(selector)
}

function $$(selector) {
    return [...document.querySelectorAll(selector)]
}

function $remove(selector) {
    document.querySelector(selector)?.remove()
}

function $$remove(selector) {
    document.querySelectorAll(selector).forEach(elem => elem.remove())
}

/** Creates a DOM `tag` element */
function domElement(
    tag = 'div',
    { children = [], id = '', classes = [], append = null } = {}
) {
    const e = document.createElement(tag)
    if (isArray(children))
        children.forEach(c => e.append(c instanceof HTMLElement ? c : c?.element))
    if (isArray(classes) && classes.length) e.classList.add(...classes)
        else if (typeof classes === 'string') e.className = classes
    if (id) e.id = id
    if (append) append.append(e)
        return e
}

/** Creates a div element styled with `style` */
function domDiv(
    style,
    { children = [], id = '', classes = [], append = null } = {}
) {
    const d = domElement('div', { id, children, classes, append })
    // @ts-ignore
    if (style) d.style = style
    return d
}

/** Creates a canvas element of size `w`x`h` */
function domCanvas(
    w = 255,
    h = 255,
    { id = null, classes = [], append = null } = {}
) {
    const c = domElement('canvas', { id, classes, append })
    c.width = w
    c.height = h
    return c
}

/** Creates a video element of size `w`x`h` */
function domVideo(
    src = '',
    {
        w = 255,
        h = 255,
        id = null,
        classes = [],
        append = null,
        muted = false,
        autoPlay = false
    } = {}
) {
    const v = domElement('video', { id, classes, append })
    v.crossOrigin = ''
    v.width = w
    v.height = h
    v.src = src
    if (muted) v.muted = true
    if (autoPlay) v.play()
        return v
}

/** Creates a button element with the given text and onclick callback */
function domButton(
    txt = '',
    onclick,
    { id = null, classes = [], append = null, autoClick = false } = {}
) {
    const b = domElement('button', { id, classes, append })
    b.innerHTML = txt
    b.onclick = onclick
    if (autoClick) b.click()
        return b
}

/** Creates a p element with the given text */
function domP(txt = '', { id = null, classes = [], append = null } = {}) {
    const p = domElement('p', { id, classes, append })
    p.innerText = txt
    return p
}

/** Creates a slider element with the given options */
function domSlider(
    v = 0,
    min = 0,
    max = 10,
    step = 0.1,
    { id = null, classes = [], append = null, oninput = null } = {}
) {
    const s = domElement('input', { id, classes, append })
    s.type = 'range'
    s.min = min.toString()
    s.max = max.toString()
    s.step = step.toString()
    s.value = v.toString()
    // TODO: IDK how to type this
    // @ts-ignore
    s.oninput = oninput
    
    return {
        element: s,
        get value() {
            return s.value
        }
    }
}

/** Creates a select element with the given options */
function domSelect(
    options = [],
    { id = null, classes = [], append = null, onchange = null } = {}
) {
    const s = domElement('select', { id, classes, append })
    // @ts-ignore
    s.onchange = onchange
    
    for (const label of options) {
        const o = document.createElement('option')
        o.value = o.innerText = label
        s.append(o)
    }
    
    return {
        element: s,
        get value() {
            return s.value
        }
    }
}

/** Creates a modal (div element) with the given html and actions */
function domModal(
    bodyHTML = '',
    actions = {},
    { id = null, classes = [], append = document.body } = {}
) {
    const m = domDiv(
        'position: fixed; top: 50%; left: 50%; translate: -50% -50%; min-width: 200px; min-height: 100px',
        { id, classes, append }
    )
    m.classList.add('modal')
    m.innerHTML = `
 <div class='modal-body'></div>
 <div class='modal-actions'></div>`
    // @ts-ignore
    if (typeof bodyHTML === 'string')
        m.querySelector('.modal-body').innerHTML = bodyHTML
    // @ts-ignore
    else m.querySelector('.modal-body').append(bodyHTML)
    // @ts-ignore
    m.close = () => {
        m.dispatchEvent(new Event('close'))
        m.remove()
    }
    
    // @ts-ignore
    const ma = m.querySelector('.modal-actions')
    
    for (const label in actions) {
        const b = document.createElement('button')
        b.className = 'btn-action btn-action-' + label.toLowerCase()
        b.innerText = label
        // @ts-ignore
        b.onclick = () => actions[label](m)
        // @ts-ignore
        ma.append(b)
    }
    
    if (!('close' in actions) && !('Close' in actions)) {
        const b = document.createElement('button')
        b.className = 'btn-action btn-action-close'
        b.innerText = 'Close'
        // @ts-ignore
        b.onclick = m.close
        // @ts-ignore
        ma.append(b)
    }
    
    return m
}

let _windowsList = []

function domDnDWindow(
    name = '',
    bodyHTML = '',
    x = innerWidth / 2,
    y = innerHeight / 2,
    w = 255,
    h = 255,
    { id = null, classes = [], canBeMinimized = true, canBeClosed = false } = {}
) {
    if (typeof w === 'number') x -= w / 2
    const win = domDiv(
        `left: ${x}px; top: ${y}px; width: ${w}px; height: ${h}px; z-index: ${_windowsList.length + 1}`,
        { id, classes, append: document.body }
    )
    _windowsList.push(win)
    win.classList.add('win')
    win.innerHTML = `
 <div class='win-head'>
 <p class='win-name'>${name}</p>
 <div class='win-actions'>
 ${canBeMinimized ? '<button class="win-minimize">-</button>' : ''}
 ${canBeClosed ? '<button class="win-close">x</button>' : ''}
 </div>
 </div>
 <div class='win-body'></div>`
    const winHead = win.querySelector('.win-head')
    const winBody = win.querySelector('.win-body')
    if (typeof bodyHTML === 'string') winBody.innerHTML = bodyHTML
    else winBody.append(bodyHTML)
    const btnMinimize = win.querySelector('.win-minimize')
    const btnClose = win.querySelector('.win-close')
    
    if (btnMinimize)
        btnMinimize.onclick = () => {
        win.classList.toggle('minimized')
        keepInBounds()
    }
    
    if (btnClose) btnClose.onclick = () => win.remove()
        
    const keepInBounds = () => {
        const wx = parseFloat(win.style.left)
        const wy = parseFloat(win.style.top)
        const ww = win.offsetWidth
        const wh = win.offsetHeight
        x = mathClamp(wx, 0, innerWidth - ww)
        y = mathClamp(wy, 0, innerHeight - wh)
        win.style.left = x + 'px'
        win.style.top = y + 'px'
    }
    
    setTimeout(keepInBounds)
    let dragging = false
    let mpx = 0
    let mpy = 0
    
    winHead.onpointerdown = e => {
        if (!e?.target.classList?.contains?.('win-name')) return
        const index = _windowsList.indexOf(win)
        _windowsList.splice(index, 1)
        _windowsList.push(win)
        // @ts-ignore
        _windowsList.forEach(win => (win.style.zIndex = _windowsList.indexOf(win)))
        // @ts-ignore
        win.style.zIndex = _windowsList
        dragging = true
        mpx = e.x
        mpy = e.y
        e.preventDefault()
    }
    
    window.addEventListener('pointermove', e => {
        win.classList.toggle('grabbed', dragging)
        if (!dragging) return
        win.style.left = e.x - mpx + x + 'px'
        win.style.top = e.y - mpy + y + 'px'
    })
    
    window.addEventListener('pointerup', () => {
        dragging = false
        keepInBounds()
    })
    
    window.addEventListener('resize', keepInBounds)
    
    return {
        element: win,
        head: winHead,
        body: winBody,
        minimize() {
            btnMinimize.click()
        },
        close() {
            win.remove()
        }
    }
}

/** Remove all the node's event listeners by cloning and replacing it */
function domRemoveListeners(el) {
    const c = el.cloneNode(true)
    el.parentNode?.replaceChild?.(c, el)
    el.remove()
    return c
}

// #endregion

// #region String

/** Gets a char from a string. Negative values count from the end */
function strGet(str, i) {
    if (i >= str.length) return undefined
    return str[(i + str.length) % str.length]
}

/** Checks if the character is a vowel */
function strCharIsVowel(ch) {
    return 'aAeEiIoOuU'.includes(ch)
}

/** Checks if the character is a consonant */
function strCharIsConsonant(ch) {
    return !'aAeEiIoOuU'.includes(ch)
}

/** Counts the amount of character that returned true for `f` */
function strCount(str, f = ch => true) {
    let count = 0
    for (let i = 0; i < str.length; i++) {
        if (f(str[i])) count++
    }
    return count
}

/** Sets the `i`th character of `str` to `ch` */
function strSetChar(str, i, ch) {
    if (i > str.length - 1) return str
    return (str.substring(0, i) + ch[0] + str.substring(i + 1)).substring(
        0,
        str.length
    )
}

function strPadAround(str, len, fillString) {
    if (len < str.length) return str.substring(0, len)
        return str
    .padStart((str.length + len) >> 1, fillString)
    .padEnd(len, fillString)
}

/** Concatenates `str2` to `str1` starting at the character `i` [0, str1.length - 1] */
function strConcatAt(str1, i, str2) {
    if (i > str1.length - 1) return str1 + str2
    return str1.substring(0, i) + str2 + str1.substring(i)
}

/** Finds the index of the closest `ch` found from index `i` */
function strIndexOfClosest(str, ch, i) {
    const len = max(str.length - i, i)
    
    for (let j = 1; j < len; j++) {
        if (str[i - j] === ch) return i - j
        if (str[i + j] === ch) return i + j
    }
    
    return -1
}

/** Finds the index of the closest `repetitions`th `ch` found from index `i` going to the *left* */
function strIndexOfLeftRepeat(str, ch, i, repetitions) {
    let count = 0
    
    for (let j = 1; j < i; j++) {
        if (str[i - j] === ch && ++count === repetitions) return i - j
    }
    
    return -1
}

/** Finds the index of the closest `repetitions`th `ch` found from index `i` going to the *right* */
function strIndexOfRightRepeat(str, ch, i, repetitions) {
    let count = 0
    
    for (let j = 1; j < i; j++) {
        if (str[i - j] === ch && ++count === repetitions) return i - j
    }
    
    return -1
}

/** Finds the index of the closest `repetitions`th `ch` found from index `i` going *both* ways */
function strIndexOfClosestRepeat(str, ch, i, repetitions) {
    const len = max(str.length - i, i)
    let countL = 0
    let countR = 0
    
    for (let j = 1; j < len; j++) {
        if (str[i - j] === ch && ++countL === repetitions) return i - j
        if (str[i + j] === ch && ++countR === repetitions) return i + j
    }
    
    return -1
}

/** Checks if a string is in LowerCase */
function strIsLower(str) {
    return str === str.toLowerCase()
}

/** Checks if a string is in UpperCase */
function strIsUpper(str) {
    return str === str.toUpperCase()
}

/** Converts a string to PascalCase */
function strToPascalCase(str) {
    if (!str) return ''
    return strSetChar(strToCamelCase(str), 0, str[0].toUpperCase()).trim()
}

/** Converts a string to CamelCase */
function strToCamelCase(str) {
    return str
    .toLowerCase()
    .replace(/\s./g, match => match.trim().toUpperCase())
    .trim()
}

/** Converts a string to TitleCase */
function strToTitleCase(str) {
    if (!str) return ''
    return strSetChar(
        str.replace(/\s./g, match => ' ' + match.trim().toUpperCase()),
        0,
        str[0].toUpperCase()
    ).trim()
}

/** Converts a string to FlatCase */
function strToFlatCase(str) {
    return str
    .toLowerCase()
    .replace(/\s./g, match => match.trim())
    .trim()
}

/** Converts a string to SnakeCase */
function strToSnakeCase(str) {
    return str
    .toLowerCase()
    .replace(/\s./g, match => '_' + match.trim())
    .trim()
}

/** Converts a string to ConstantCase */
function strToConstantCase(str) {
    return str
    .toUpperCase()
    .replace(/\s./g, match => '_' + match.trim())
    .trim()
}

/** Converts a string to KebabCase */
function strToKebabCase(str) {
    return str
    .toLowerCase()
    .replace(/\s./g, match => '-' + match.trim())
    .trim()
}

/** Converts a string to MacroCase */
function strToMacroCase(str) {
    return str
    .toUpperCase()
    .replace(/\s./g, match => '-' + match.trim())
    .trim()
}

/** Converts a string to TrainCase */
function strToTrainCase(str) {
    return str
    .toLowerCase()
    .replace(/[^\S\r\n]/g, match => '-' + match.trim().toUpperCase())
    .trim()
}

/** Uses the entries in `map` (each key, value) as arguments for str.replaceAll. Each replacement might affect the next */
function strReplaceAllMap(str, map) {
    if (map === null || typeof map !== 'object') return str
    for (const [key, value] of Object.entries(map)) {
        if (isArray(value)) str = str.replaceAll(key, () => randItem(value))
            else str = str.replaceAll(key, value)
    }
    return str
}

// #endregion

// #region Array

/** Gets an item from an array. Negative values count from the end */
function arrGet(arr, i) {
    if (i >= arr.length) return undefined
    return arr[(i + arr.length) % arr.length]
}

/** Shallow clones an array */
function arrClone(arr) {
    const clone = []
    for (let item of arr) {
        clone.push(item)
    }
    return clone
}

/** Grabs an amount from the beginning of an array, removing from the original array */
function arrGrab(arr, amount) {
    const grab = []
    for (let i = 0; i < amount && arr.length; i++) {
        grab.push(arr.shift())
    }
    return grab
}

/** Counts the amount of items that returned true for `f` */
function arrCount(arr, f = () => true) {
    let count = 0
    for (let i = 0; i < arr.length; i++) {
        if (f(arr[i])) count++
    }
    return count
}

/** Shuffles the array */
function arrShuffle(arr) {
    arr.sort(() => random() - 0.5)
}

/** Swaps two indexes of the array */
function arrSwap(arr, i0, i1) {
    ;[
        arr[(i0 + arr.length) % arr.length],
        arr[(i1 + arr.length) % arr.length]
    ] = [arr[(i1 + arr.length) % arr.length], arr[(i0 + arr.length) % arr.length]]
}

/** Collapses the array into a value with a `transformer` function */
function arrCollapse(arr, transformer) {
    if (arr.length === 0) return undefined
    let value = arr[0]
    for (let i = 1; i < arr.length; i++) {
        value = transformer(value, arr[i])
    }
    return value
}

/** Expands the array with a `transformer` function */
function arrExpand(arr, transformer, length = 0) {
    if (arr.length < 2 || length < arr.length) return
    while (arr.length < length)
        arr.push(transformer(arr[arr.length - 1], arr[arr.length - 2]))
}

/** Chunks the array into smaller arrays of a specified size */
function arrChunkify(arr, chunkSize = 2) {
    const chunks = []
    outer: for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = []
        chunks.push(chunk)
        for (let j = i; j < i + chunkSize; j++) {
            if (j === arr.length) break outer
            chunk.push(arr[j])
        }
    }
    return chunks
}

/** Finds the intersection of two arrays */
function arrIntersection(arr1, arr2) {
    const intersection = []
    const set1 = new Set(arr1)
    const set2 = new Set(arr2)
    for (const x of set1.values()) {
        if (set2.has(x)) intersection.push(x)
        }
    return intersection
}

/** Creates a 1D array with a default value or a function to generate values */
function arr1D(l, def) {
    const arr = []
    for (let i = 0; i < l; i++) {
        arr.push(typeof def === 'function' ? def() : def)
    }
    return arr
}

/** Creates a 2D array with a default value or a function to generate values */
function arr2D(w, h, def) {
    const arr = []
    for (let i = 0; i < h; i++) {
        const row = []
        arr[i] = row
        for (let j = 0; j < w; j++) {
            row.push(typeof def === 'function' ? def() : def)
        }
    }
    return arr
}

/** Creates an n-dimensional array with a default value or a function to generate values */
function arrND(dim, def) {
    if (dim.length === 1) return arr1D(dim[0], def)
        if (dim.length === 2) return arr2D(dim[0], dim[1], def)
            const arr = arr2D(dim[0], dim[1], [])
    for (let i = 2; i < dim.length; i++) {
        const curr = dim[i]
        if (!curr) break
        const next = dim[i + 1]
        for (let i = 0; i < curr; i++) {
            for (const branch of arr.flat(i - 1)) {
                if (next) branch.push([])
                    else branch.push(typeof def === 'function' ? def() : def)
            }
        }
    }
    return arr
}

/** Traverses a 2D array and applies a callback function */
function arrTraverse2D(arr, cb, order = 'yx') {
    if (arr == null) return
    
    if (order === 'xy') {
        for (let x = 0; x < arr[0].length; x++) {
            for (let y = 0; y < arr.length; y++) {
                cb(arr[y][x], x, y)
            }
        }
    } else {
        for (let y = 0; y < arr.length; y++) {
            for (let x = 0; x < arr[0].length; x++) {
                cb(arr[y][x], x, y)
            }
        }
    }
}

// #endregion

// #region Image manipulation

/** Enables fast access to the pixel data of an image. Useful for image processing */
function installSpriteHandler(img) {
    const cv = _canvas(img.width, img.height)
    const gfx = cv.getContext('2d')
    if (gfx == null)
        throw new Error(
        'Could not get the CanvasRenderingContext2D. \'canvas.getContext()\' failed.'
    )
    gfx.drawImage(img, 0, 0)
    const imageData = gfx.getImageData(0, 0, cv.width, cv.height)
    
    return {
        getPixel(x, y) {
            const data = imageData.data
            const i = (y * imageData.width + x) << 2
            return [data[i], data[i + 1], data[i + 2], data[i + 3]]
        },
        getPixelIndex(i) {
            i <<= 2
            const data = imageData.data
            return [data[i], data[i + 1], data[i + 2], data[i + 3]]
        },
        setPixel(x, y, pixel) {
            x = floor(x)
            y = floor(y)
            if (x >= cv.width || x < 0 || y >= cv.height || y < 0) return
            const data = imageData.data
            const i = (y * imageData.width + x) << 2
            data[i] = pixel[0]
            data[i + 1] = pixel[1]
            data[i + 2] = pixel[2]
            data[i + 3] = pixel[3] ?? data[i + 3]
        },
        setPixelIndex(i, pixel) {
            i <<= 2
            const data = imageData.data
            if (i < 0 || i + 5 > data.length) return
            data[i] = pixel[0]
            data[i + 1] = pixel[1]
            data[i + 2] = pixel[2]
            data[i + 3] = pixel[3] ?? data[i + 3]
        },
        setPixelUnsafe(x, y, pixel) {
            const data = imageData.data
            const i = (y * imageData.width + x) * 4
            data[i] = pixel[0]
            data[i + 1] = pixel[1]
            data[i + 2] = pixel[2]
            data[i + 3] = pixel[3]
        },
        setPixelIndexUnsafe(i, pixel) {
            i <<= 2
            const data = imageData.data
            data[i] = pixel[0]
            data[i + 1] = pixel[1]
            data[i + 2] = pixel[2]
            data[i + 3] = pixel[3]
        },
        refresh() {
            gfx.putImageData(imageData, 0, 0)
        },
        get canvas() {
            return cv
        }
    }
}

/** Returns a canvas width the image on it */
function cnvFromImage(img, pixelArt = false) {
    const cv = _canvas(img.width, img.height)
    const gfx = cv.getContext('2d')
    if (gfx == null)
        throw new Error(
        'Could not get the CanvasRenderingContext2D. \'canvas.getContext()\' failed.'
    )
    gfx.drawImage(img, 0, 0)
    gfx.imageSmoothingEnabled = !pixelArt
    return cv
}

/** Returns a canvas with the cut image on it */
function cnvCut(
    img,
    x = 0,
    y = 0,
    w = img.width,
    h = img.height,
    pixelArt = false
) {
    const cv = _canvas(w, h)
    const gfx = cv.getContext('2d')
    if (gfx == null)
        throw new Error(
        'Could not get the CanvasRenderingContext2D. \'canvas.getContext()\' failed.'
    )
    gfx.drawImage(img, -x, -y)
    gfx.imageSmoothingEnabled = !pixelArt
    return cv
}

/** Returns a canvas with the resized image on it */
function cnvResize(
    img,
    w = img.width,
    h = img.height,
    quality = 'medium',
    pixelArt = false
) {
    const gfx = _canvas(w, h).getContext('2d')
    if (gfx == null)
        throw new Error(
        'Could not get the CanvasRenderingContext2D. \'canvas.getContext()\' failed.'
    )
    gfx.imageSmoothingQuality = quality
    gfx.imageSmoothingEnabled = !pixelArt
    gfx.drawImage(img, 0, 0, w, h)
    return gfx.canvas
}

/** Returns a canvas with the scaled image on it */
function cnvScale(img, sx = 1, sy = 1, pixelArt = false) {
    const cv = _canvas(img.width * abs(sx), img.height * abs(sy))
    const gfx = cv.getContext('2d')
    if (gfx == null)
        throw new Error(
        'Could not get the CanvasRenderingContext2D. \'canvas.getContext()\' failed.'
    )
    gfx.imageSmoothingEnabled = !pixelArt
    if (sx < 0 || sy < 0) {
        gfx.translate(cv.width / 2, cv.height / 2)
        gfx.scale(sx, sy)
        gfx.drawImage(img, -(img.width >> 1), -(img.height >> 1))
    } else gfx.drawImage(img, 0, 0, cv.width, cv.height)
    return cv
}

/** Returns a canvas with the tinted image on it */
function cnvTint(img, tint, amount = 0.5, pixelArt = false) {
    const cv = _canvas(img.width, img.height)
    const gfx = cv.getContext('2d')
    if (gfx == null)
        throw new Error(
        'Could not get the CanvasRenderingContext2D. \'canvas.getContext()\' failed.'
    )
    gfx.imageSmoothingEnabled = !pixelArt
    gfx.drawImage(img, 0, 0, cv.width, cv.height)
    gfx.globalCompositeOperation = 'source-atop'
    gfx.fillStyle = tint
    gfx.globalAlpha = amount
    gfx.fillRect(0, 0, cv.width, cv.height)
    return cv
}

/** Cuts an image into frames of size `w` x `h`. Useful for building games, tile sets and importing animations */
function cnvSplitSheet(
    img,
    w = 16,
    h = 16,
    margin = 0,
    padding = 0,
    marginLeft = 0
) {
    const cols = ceil((img.width - margin - marginLeft) / (w + padding))
    const rows = ceil((img.height - margin) / (h + padding))
    const frames = []
    const wp = w + padding
    const hp = h + padding
    
    for (let i = 0; i < rows; i++)
        for (let j = 0; j < cols; j++)
            frames.push(
        cnvCut(img, marginLeft + margin + wp * j, margin + hp * i, w, h)
    )
    
    return frames
}

/** Calls `transformCB` for each pixel of the image and returns a canvas with the modified pixel data. Useful for image processing */
function cnvEachPixel(img, transformCB) {
    const cv = _canvas(img.width, img.height)
    const gfx = cv.getContext('2d')
    if (gfx == null)
        throw new Error(
        'Could not get the CanvasRenderingContext2D. \'canvas.getContext()\' failed.'
    )
    gfx.imageSmoothingEnabled = false
    gfx.drawImage(img, 0, 0)
    const imageData = gfx.getImageData(0, 0, cv.width, cv.height)
    const d = imageData.data
    const len = d.length
    
    for (let i = 0; i < len; i++) {
        const px = transformCB([d[i], d[i + 1], d[i + 2], d[i + 3]], i >> 2)
        d[i] = px[0]
        d[++i] = px[1]
        d[++i] = px[2]
        d[++i] = px[3]
    }
    
    gfx.putImageData(imageData, 0, 0)
    return cv
}

/** Calls `transformCB` for each pixel of the image, also passing the X and Y position as arguments, and returns a canvas with the modified pixel data. Useful for image processing */
function cnvEachPixelXY(img, transformCB) {
    const cv = _canvas(img.width, img.height)
    const gfx = cv.getContext('2d')
    if (gfx == null)
        throw new Error(
        'Could not get the CanvasRenderingContext2D. \'canvas.getContext()\' failed.'
    )
    gfx.imageSmoothingEnabled = false
    gfx.drawImage(img, 0, 0)
    const imageData = gfx.getImageData(0, 0, cv.width, cv.height)
    const w = imageData.width
    const ooW = 1 / w
    const d = imageData.data
    const len = d.length
    
    for (let i = 0; i < len; i++) {
        const y = floor((i >> 2) * ooW)
        // const x = (i >> 2) - y * w
        const px = transformCB(
            [d[i], d[i + 1], d[i + 2], d[i + 3]],
            (i >> 2) - y * w,
            y,
            i >> 2
        )
        d[i] = px[0]
        d[++i] = px[1]
        d[++i] = px[2]
        d[++i] = px[3]
    }
    
    gfx.putImageData(imageData, 0, 0)
    return cv
}

/** Returns a canvas with the image pixelated to fit `resolution` */
function cnvPixelate(img, resolution) {
    const scale = resolution / max(img.width, img.height)
    const cv = _canvas(floor(img.width * scale), floor(img.height * scale))
    const gfx = cv.getContext('2d')
    if (gfx == null)
        throw new Error(
        'Could not get the CanvasRenderingContext2D. \'canvas.getContext()\' failed.'
    )
    gfx.imageSmoothingEnabled = false
    gfx.drawImage(img, 0, 0, cv.width, cv.height)
    return cnvScale(cv, 1 / scale, 1 / scale, true)
}

/** Keys out any pixels whose color matches `color` by the threshold `thr`. Returns a canvas */
function cnvColorKey(img, color, thr = 10) {
    thr *= thr
    const ccolor = colorParse(color)
    const r = ccolor[0]
    const g = ccolor[1]
    const b = ccolor[2]
    
    return cnvEachPixel(img, p => {
        if ((p[0] - r) ** 2 + (p[1] - g) ** 2 + (p[2] - b) ** 2 <= thr) p[3] = 0
        return p
    })
}

/** Limit each color's component of every pixel to a count of `k`. Returns a canvas */
function cnvLowerPalette(img, k) {
    const factor = 256 / (k || 1)
    const ooFactor = 1 / factor
    
    return cnvEachPixel(img, p => {
        p[0] = round(p[0] * ooFactor) * factor
        p[1] = round(p[1] * ooFactor) * factor
        p[2] = round(p[2] * ooFactor) * factor
        return p
    })
}

/** Returns a canvas with the multiply effect applied to every pixel of the image. If not given, the arguments `g` and `b` will default to the value of `r` and `g`, respectively */
function cnvMultiply(img, r = 1, g = r, b = g, a = 1) {
    return cnvEachPixel(img, p => {
        p[0] *= r
        p[1] *= g
        p[2] *= b
        p[3] *= a
        return p
    })
}

/** Tries to match each of the image's pixel's color to a color in the palette. Returns a canvas */
function cnvUsePalette(img, palette) {
    const cv = _canvas(img.width, img.height)
    const gfx = cv.getContext('2d')
    if (gfx == null)
        throw new Error(
        'Could not get the CanvasRenderingContext2D. \'canvas.getContext()\' failed.'
    )
    gfx.imageSmoothingEnabled = false
    gfx.drawImage(img, 0, 0)
    const imageData = gfx.getImageData(0, 0, cv.width, cv.height)
    const d = imageData.data
    const len = d.length
    const palLen = palette.length
    
    if (typeof palette[0] === 'string') {
        // @ts-ignore
        palette = palette.map(c => colorParse(c))
    }
    
    for (let i = 0; i < len; i += 4) {
        const pR = d[i]
        const pG = d[i + 1]
        const pB = d[i + 2]
        let cColor = null
        let ccDist = 999999
        
        for (let j = 0; j < palLen; j++) {
            const color = palette[j]
            const dist =
            (color[0] - pR) ** 2 + (color[1] - pG) ** 2 + (color[2] - pB) ** 2
            
            if (dist < ccDist) {
                ccDist = dist
                cColor = color
            }
        }
        
        if (cColor) {
            d[i] = cColor[0]
            d[i + 1] = cColor[1]
            d[i + 2] = cColor[2]
        }
    }
    
    gfx.putImageData(imageData, 0, 0)
    
    return cv
}

/** Returns a canvas with the grayscale effect applied to the image. Internally uses colorGetBrightness */
function cnvGrayscale(img) {
    return cnvEachPixel(img, p => {
        p[0] = p[1] = p[2] = colorGetBrightness(p[0], p[1], p[2])
        return p
    })
}

/** Converts a canvas into an image */
async function cnvToImage(cnv) {
    return await loadImage(cnv.toDataURL())
}

/** Converts a canvas into an image */
function cnvToImageCB(cnv, cb, err) {
    loadImageCB(cnv.toDataURL(), cb, err)
}

/** Returns the pixel value in the position `x`, `y` of the image */
function cnvGetPixel(img, x, y) {
    const cv = _canvas(img.width, img.height)
    const gfx = cv.getContext('2d')
    if (gfx == null)
        throw new Error(
        'Could not get the CanvasRenderingContext2D. \'canvas.getContext()\' failed.'
    )
    gfx.drawImage(img, 0, 0)
    const p = gfx.getImageData(x, y, 1, 1).data
    return [p[0], p[1], p[2], p[3]]
}

/** Returns a list of [x, y] positions of every pixel whose color matches `color` by the threshold `thr`. Useful for finding a specific colored object in an image or creative coding in general */
function cnvGetCluster(img, color, thr) {
    const ccolor = colorParse(color)
    const r = ccolor[0]
    const g = ccolor[1]
    const b = ccolor[2]
    const found = []
    thr *= thr
    const w = img.width
    const ooW = 1 / w
    
    cnvEachPixel(img, (p, i) => {
        if ((p[0] - r) ** 2 + (p[1] - g) ** 2 + (p[2] - b) ** 2 <= thr)
            found.push([(i >> 2) % w, floor((i >> 2) * ooW)])
        return p
    })
    
    return found
}

/** Returns the averaged center of all the pixels whose color matches `color` by the threshold `thr`. Useful for finding a specific colored object in an image or creative coding in general */
function cnvGetClusterCenter(img, color, thr) {
    const cluster = cnvGetCluster(img, color, thr)
    const center = [cluster[0][0], cluster[0][1]]
    const len = cluster.length
    
    for (let i = 1; i < len; i++) {
        const px = cluster[i]
        center[0] += px[0]
        center[1] += px[1]
    }
    
    return [center[0] / cluster.length, center[1] / cluster.length]
}

// #endregion

// #region Engine

/**
* Starts a timed loop. Helpful when creating games or animations
* @param tick - Function to be called each frame
* @param desiredFps - Target fps of the loop (default is 60)
* @param autoRun - Whether the loop should start automatically (default is true)
* @param catchUp - Whether the ticking method should try to fit as many 'ticks' as possible (default is false)
*/
function installLoop(tick, desiredFps = 60, autoRun = true, catchUp = true) {
    if (!tick) autoRun = false
    
    let desiredDt = max(1000 / desiredFps, 0.01)
    let startTime = performance.now()
    let lastTime = startTime
    let frame = 0
    let fps = desiredFps
    let paused = false
    let stopped = false
    let timeAccu = 0
    let running = autoRun
    
    let fpsCalcElapsedFrames = 0
    
    setInterval(() => {
        fps = fpsCalcElapsedFrames
        fpsCalcElapsedFrames = 0
    }, 1000)
    
    let loop = now => {
        if (!paused) {
            const elapsed = now - lastTime
            timeAccu += elapsed
            
            let steps = 0
            
            if (catchUp) {
                if (timeAccu - desiredDt > 4 * desiredDt) timeAccu = desiredDt
                
                while (timeAccu >= desiredDt) {
                    tick?.(desiredDt / (timeAccu / desiredDt))
                    fpsCalcElapsedFrames++
                    frame++
                    steps++
                    timeAccu -= desiredDt
                }
                
                lastTime = now
            } else if (now - lastTime > desiredDt) {
                tick?.(elapsed)
                fpsCalcElapsedFrames++
                frame++
                lastTime += desiredDt
                
                if (now - lastTime > 2 * desiredDt) lastTime = now
            }
        }
        
        if (!stopped) requestAnimationFrame(loop)
            
        return frame
    }
    
    if (autoRun) requestAnimationFrame(loop)
        
    return {
        get paused() {
            return paused
        },
        get stopped() {
            return stopped
        },
        get frame() {
            return frame
        },
        get dt() {
            return performance.now() - lastTime
        },
        get fps() {
            return fps
        },
        set fps(v) {
            desiredFps = v
            desiredDt = 1000 / v
        },
        run() {
            paused = false
            if (!running) requestAnimationFrame(loop)
            },
        pause() {
            paused = true
        },
        resume() {
            paused = false
        },
        stop() {
            paused = stopped = true
        },
        get tick() {
            return tick
        },
        set tick(f) {
            tick = f
        },
        get timePassed() {
            return performance.now() - startTime
        }
    }
}

// #endregion

// #region Timers

const _currTimers = []

/** Creates a Cool Down Handler. Useful for games */
function installCoolDownH() {
    return {
        _map: new Map(),
        update(dt) {
            this._map.forEach((value, key) => this._map.set(key, value - dt))
        },
        /** Creates a CoolDown or retrieve it's value, also setting it back to `delay` */
        refire(name, delay, initial = true) {
            this._map.set(name, delay)
        },
        /** Creates a CoolDown or retrieves it's value */
        coolDown(name, delay, initial = true) {
            if (delay == null) return this._map.get(name) < 0
            
            if (!this._map.has(name)) {
                this._map.set(name, delay)
                return initial
            }
            
            if (this._map.get(name) < 0) {
                this._map.set(name, delay)
                return true
            }
            
            return false
        }
    }
}

// TODO: Test this code
function timerCreate(delay, tick) {
    let time0 = performance.now()
    let time1 = time0
    let id = time0 + randID(16)
    let paused = false
    
    const timer = {
        id,
        get delay() {
            return delay
        },
        set delay(v) {
            delay = v
        },
        paused: false,
        update() {
            const now = performance.now()
            if (paused) {
                time0 += now - time1
                time1 = now
            }
            const dt = delay - now + time0
            if (dt < 0) {
                time0 = now
                tick(dt)
            }
        },
        stop() {
            _currTimers.splice(
                _currTimers.findIndex(t => t.id === id),
                1
            )
        }
    }
    
    _currTimers.push(timer)
    return timer
}

function timerUpdate() {
    for (const a of _currTimers) a.update()
    }

function timerStop(i = _currTimers.length - 1) {
    _currTimers[i].stop()
}

function timerStopAll() {
    while (_currTimers) timerStop()
    }

function timerPause(i) {
    if (i != null) return (_currTimers[i].paused = true)
        for (let i = _currTimers.length - 1; i >= 0; i--)
            if (!_currTimers[i].paused) return (_currTimers[i].paused = true)
            }

function timerPauseAll() {
    for (const a of _currTimers) a.paused = true
}

function timerResume(i) {
    if (i != null) return (_currTimers[i].paused = false)
        for (let i = 0; i < _currTimers.length; i++)
            if (_currTimers[i].paused) return (_currTimers[i].paused = false)
            }

function timerResumeAll() {
    for (const a of _currTimers) a.paused = false
}

// #endregion

// #region EFX

/** Returns a canvas with the vignette effect on it
* @param {number} k - Strength of the effect
* @param {boolean} useMin - If the smallest side should be used for calculations
*/
function efxVignette(w = 255, h = 255, k = 0.9, useMin = true) {
    const cv = _canvas(w, h)
    let len = useMin ? min(w, h) : max(w, h)
    len *= len
    const cx = w * 0.5
    const cy = h * 0.5
    
    return cnvEachPixelXY(cv, (p, x, y) => {
        // Cool math to create the faded circle
        const dist = (x - cx) ** 2 + (y - cy) ** 2
        p[3] = min(max((dist / len) ** k, 0), 1) * 255
        p[0] = p[1] = p[2] = 0
        return p
    })
}

/** Returns a canvas with the tinted image drawn on it */
function efxTint(img, color, amount = 0.5) {
    // I've implemented a better way of doing this in Choco.js
    // TODO: Improve this effect or add another one of the same kind
    const w = img.width
    const h = img.height
    const cv = _canvas(w, h)
    const gfx = cv.getContext('2d')
    if (gfx == null)
        throw new Error(
        'Could not get the CanvasRenderingContext2D. \'canvas.getContext()\' failed.'
    )
    gfx.fillStyle = color
    gfx.fillRect(0, 0, w, h)
    gfx.globalCompositeOperation = 'destination-atop'
    gfx.drawImage(img, 0, 0)
    
    const tinted = _canvas(w, h)
    const gfx2 = tinted.getContext('2d')
    if (gfx2 == null)
        throw new Error(
        'Could not get the CanvasRenderingContext2D. \'canvas.getContext()\' failed.'
    )
    gfx2.drawImage(img, 0, 0)
    gfx2.globalAlpha = amount
    gfx2.drawImage(cv, 0, 0)
    
    return tinted
}

// #endregion

// #region Utils

// https://stackoverflow.com/a/26358856
/** Returns the expected Browser's name */
function rtGetBrowserName() {
    // @ts-ignore
    if (typeof InstallTrigger !== 'undefined') return 'Firefox'
    if (
        (navigator.userAgent.indexOf('Opera') ||
        navigator.userAgent.indexOf('OPR')) !== -1
    )
    return 'Opera'
    if (navigator.userAgent.indexOf('Edg') !== -1) return 'Edge'
    if (navigator.userAgent.indexOf('Chrome') !== -1) return 'Chrome'
    if (navigator.userAgent.indexOf('Safari') !== -1) return 'Safari'
    if (navigator.userAgent.indexOf('Firefox') !== -1) return 'Firefox'
    // @ts-ignore
    if (navigator.userAgent.indexOf('MSIE') !== -1 || !!document.documentMode)
        return 'IE'
    return 'unknown'
}

// GPT-assisted
function rtIsMobile() {
    // @ts-ignore
    const userAgent = navigator.userAgent || navigator?.vendor || window?.opera
    
    if (/android/i.test(userAgent)) return true
    
    // @ts-ignore
    if (/iPad|iPhone|iPod/.test(userAgent) && !window?.MSStream) return true
    
    if (/windows phone/i.test(userAgent)) return true
    
    return false
}

/** Async function which resolves after `ms`ms */
async function rtDelay(ms) {
    return new Promise(res => setTimeout(res, ms))
}

/** Returns a list of all of the constructors' names of an object */
function rtGetClasses(obj) {
    const classes = new Set()
    // @ts-ignore
    let proto = obj.__proto__
    do classes.add(proto.constructor.name)
    while ((proto = proto.__proto__) && !classes.has(proto.constructor.name))
        return [...classes]
}

/** Compare two values (Recursively). Types won't be casted. Works with Arrays and Objects */
function rtEquals(value1, value2) {
    // Handles types
    if (typeof value1 !== typeof value2) return false
    
    // Handles null, undefined and false
    if (value1 === value2 && value1 !== 0) return true
    
    // Handles constructors
    if (value1.constructor.name !== value2.constructor.name) return false
    
    // Handles primitives
    if (
        ['number', 'string', 'boolean', 'bigint', 'undefined', 'null'].includes(
            typeof value1
        )
    )
    return objectIs(value1, value2)
    
    // Handles arrays
    if (isArray(value1.constructor.name)) {
        if (value1.length !== value2.length) return false
        for (let i = 0; i < value1.length; i++) {
            if (!rtEquals(value1[i], value2[i])) return false
        }
        return true
    }
    
    // Handles objects
    const keys1 = objectKeys(value1)
    
    if (keys1.length != objectKeys(value2).length) return false
    
    for (const key of keys1) {
        if (!value2.hasOwnProperty(key)) return false
        if (!rtEquals(value1[key], value2[key])) return false
    }
    
    return true
}

/** Async function which resolves after user interaction or fails after `timeout`ms */
async function rtWaitForUserInteraction(
    el = document,
    cb,
    err,
    timeout = 60000
) {
    return new Promise(res => {
        const timeoutId = setTimeout(async () => {
            el.removeEventListener('pointerdown', done)
            if (err) err(new Error('User did not interact in time.'))
                res(false)
        }, timeout)
        
        const done = async e => {
            if (!e.isTrusted) return
            clearTimeout(timeoutId)
            el.removeEventListener('pointerdown', done)
            if (cb) cb()
                res(true)
        }
        
        el.addEventListener('pointerdown', done, { once: true })
    })
}

const _metaTags = new Map()
const _styleElem = document.createElement('style')
_styleElem.id = 'raitwo-internal-style-tag'
const _styleList = new Set()
document.head.append(_styleElem)

function _updateInternalStyles() {
    _styleElem.innerHTML = ''
    _styleList.forEach(value => (_styleElem.innerHTML += value))
}

/** Disables mobile refresh behavior */
function rtMobileRefreshOFF() {
    _styleList.delete('body{overscroll-behavior-y:auto !important}')
    _styleList.add('body{overscroll-behavior-y:contain !important}')
    _updateInternalStyles()
}

/** Enables mobile refresh behavior */
function rtMobileRefreshON() {
    _styleList.delete('body{overscroll-behavior-y:contain !important}')
    _styleList.add('body{overscroll-behavior-y:auto !important}')
    _updateInternalStyles()
}

/** Restores default mobile refresh behavior */
function rtMobileRefreshAuto() {
    _styleList.delete('body{overscroll-behavior-y:auto !important}')
    _styleList.delete('body{overscroll-behavior-y:contain !important}')
    _updateInternalStyles()
}

/** Disables mobile scaling behavior */
function rtMobileScaleOFF() {
    let meta = _metaTags.get('mobile-scale')
    if (!meta) {
        meta = document.createElement('meta')
        meta.className = 'raitwo-internal-meta-tag'
        meta.name = 'viewport'
        _metaTags.set('mobile-scale', meta)
        document.head.append(meta)
    }
    meta.content = 'user-scalable=no'
}

/** Enables mobile scaling behavior */
function rtMobileScaleON() {
    let meta = _metaTags.get('mobile-scale')
    if (!meta) {
        meta = document.createElement('meta')
        meta.className = 'raitwo-internal-meta-tag'
        meta.name = 'viewport'
        _metaTags.set('mobile-scale', meta)
        document.head.append(meta)
    }
    meta.content = 'user-scalable=yes'
}

/** Restores the default mobile scaling behavior */
function rtDefaultMobileScale() {
    const meta = _metaTags.get('mobile-scale')
    if (meta) {
        meta.remove()
        _metaTags.delete('mobile-scale')
    }
}

/** Retrieves data from local storage associated with a given `key` or returns a default value if data cannot be converted to JSON */
function rtLocalGet(key, def = {}) {
    try {
        const data = JSON.parse(localStorage.getItem(key) ?? '')
        return data
    } catch (err) {
        return def
    }
}

/** Sets the `key` item in local storage to the JSON-serializable value `data` */
function rtLocalSet(key, data = {}) {
    localStorage.setItem(key, JSON.stringify(data))
}

/** Manages local storage data saving. Quality of life */
function rtLocalUse(key, def = {}, reset = false, modifiable = true) {
    const target = reset ? def : rtLocalGet(key, def)
    
    return new Proxy(target, {
        get: (target, prop) => target[prop],
        set: (target, prop, newValue) => {
            if (!modifiable && !Array.isArray(target) && !Reflect.has(target, prop))
                return false
            target[prop] = newValue
            rtLocalSet(key, target)
            return true
        }
    })
}

function rtGetType(any) {
    if (any === null) return 'null'
    
    switch (typeof any) {
        case 'number':
        if (isNaN(any)) return 'nan'
        return 'number'
        case 'function':
        if (any.toString().startsWith('class ')) return 'class'
        if ('prototype' in any) return 'constructor'
        return 'function'
        case 'object':
        if (Array.isArray(any)) return 'array'
        return 'object'
        default:
        return typeof any
    }
}

function rtGetTypeDesc(any, depth = 8) {
    if (--depth <= 0) return rtGetType(any)
        if (any === null) return 'null'
    
    switch (typeof any) {
        case 'bigint':
        return 'bigint'
        case 'boolean':
        return 'boolean'
        case 'function':
        return any.toString().startsWith('class ')
        ? 'class'
        : 'prototype' in any
        ? 'constructor'
        : 'function'
        case 'string':
        return 'string'
        case 'symbol':
        return 'symbol'
        case 'undefined':
        return 'void'
        case 'number':
        return isNaN(any) ? 'nan' : trunc(any) === any ? 'int' : 'float'
        case 'object':
        if (Array.isArray(any))
            return any.length === 0 ? 'array' : `${rtGetTypeDesc(any[0], depth)}[]`
        const keys = Reflect.ownKeys(any)
        if (new Set(keys.map(rtGetType)).size !== 1) return 'object'
        const values = keys.map(x => any[x])
        if (new Set(values.map(rtGetType)).size !== 1) return 'object'
        const key0 = keys[0]
        return `object<${rtGetType(key0)},${rtGetTypeDesc(any[key0], depth)}>`
        default:
        return 'null'
    }
}

function rtGetTypeDescMedium(any) {
    return strReplaceAllMap(rtGetTypeDesc(any), {
        bigint: 'big',
        boolean: 'bool',
        class: 'class',
        constructor: 'constr',
        function: 'fn',
        string: 'str',
        symbol: 'sym',
        int: 'int',
        float: 'float',
        object: 'obj'
    })
}

function rtGetTypeDescSmall(any) {
    return strReplaceAllMap(rtGetTypeDesc(any), {
        bigint: 'n',
        boolean: 'b',
        class: 'c',
        constructor: 'C',
        function: 'fn',
        string: 'str',
        symbol: 'sym',
        int: 'i',
        float: 'f',
        object: 'obj'
    })
}

/** Converts an array into an enumerator */
function rtEnum(...keys) {
    const enumerator = Object.fromEntries(keys.map((k, i) => [k.toString(), i]))
    return Object.freeze(enumerator)
}

/** Converts an array into an enumerator */
function rtEnumNamed(...keys) {
    const enumerator = Object.fromEntries(
        keys.map(k => [k.toString(), k.toString()])
    )
    return Object.freeze(enumerator)
}

/** Split string into tokens. Configurable */
function rtTokenize(string, { splitter = / |,/, pairs = ['""', "[]"] } = {}) {
    const tokens = []
    let left = 0
    string += " "
    
    outer: for (let i = 1; i < string.length; i++) {
        for (const pair of pairs) {
            if (string[left] === pair[0] && string[i] === pair[1]) {
                tokens.push(string.slice(left + 1, i).trim())
                left = i += 2
                continue outer
            }
        }
        
        if (string[left] !== '"' && string[left] !== "[") {
            if (splitter && splitter.test(string[i])) {
                tokens.push(string.slice(left, i).trim())
                left = ++i
                continue outer
            }
        }
    }
    
    return tokens
}

/** Activates RaiTwo's default stylesheet */
function rtDefaultStylesON() {
    document.body.append(_rtDefaultStyleSheet)
}

/** Deactivates RaiTwo's default stylesheet */
function rtDefaultStylesOFF() {
    _rtDefaultStyleSheet.remove()
}

function rtRange(fromTo, cb) {
    const [min, max] = mathMinMax(fromTo)
    for (let i = min, j = 0; i <= max; i++, j++) {
        cb(i, j)
    }
}

/** Remove all JS comments inside a string. Might break with strings containing '//' or '/*' */
function rtRemoveComments(code) {
    return code.replace(/((\/\*).+?(?=\*\/)*\/ *\n*)|(\/\/.*\n)/g, '')
}

/** Remove all JSDoc annotations inside a string. Might break with strings containing '/* @' */
function rtRemoveJSDoc(code) {
    return code.replace(/(\/\*\* @).+?(?=\*\/)*\/ *\n*/g, '')
}

/**
* Match statement for JavaScript
*
* This function allows pattern matching against a tuple with associated actions.
*
* @example
* rtMatch([1, 'apple'], [
*   1, () => {
*     console.log('Does not match');
*   },
*   (_break) => {
*     console.log('Executes anyway');
*   },
*   [1, 'apple'], () => {
*     console.log('Matches');
*   }
* ]);
*
* @example
* * rtMatch([1, 'apple'], [
*   (_break) => {
*     console.log('Executes anyway and breaks the matching statement');
*     _break();
*   },
*   rtMatch.ANY, () => {
*     console.log('Would match if _break was not called before');
*   }
* ]);
*/
function rtMatch(tuple, matches) {
    tuple = isArray(tuple) ? tuple : [tuple]
    let _break = false
    let ret
    
    out: for (let i = 0; i < matches.length; i += 2) {
        const matchTest = matches[i]
        
        if (typeof matchTest === 'function') {
            i--
            ret = matchTest?.(() => (_break = true))
            
            if (_break) return ret
            continue
        }
        
        _break = true
        
        // Test case
        if (isArray(matchTest)) {
            for (let j = 0; j < tuple.length; j++) {
                const t = tuple[j]
                const m = matchTest?.[j]
                
                if (m !== rtMatch.ANY && !rtEquals(t, m)) continue out
            }
            
            if (matches[i + 1] instanceof Function) {
                // @ts-ignore
                ret = matches[i + 1](() => (_break = false))
            }
            
            if (_break) return
        }
    }
    
    return ret
}

rtMatch.ANY = Symbol('any')

function rtIter(items) {
    items = items.slice()
    
    return {
        map: cb => rtIter(items.map(cb)),
        filter: cb => rtIter(items.filter(cb)),
        take: count => rtIter(items.slice(0, min(count, items.length))),
        skip: amount => rtIter(items.slice(amount)),
        range: (from, to) => rtIter(items.slice(from, to + 1)),
        remove: (i, count) =>
            rtIter(items.slice(0, i).concat(items.slice(i + count))),
        next: () => items.shift(),
        collect: () => items,
        clone: () => rtIter(items),
        
        *[Symbol.iterator]() {
            for (let item of items) yield item
        }
    }
}

function rtTween(obj, key, from, to, delay, { afterLerpCB = v => v } = {}) {
    if (typeof from !== typeof to)
        throw new TypeError('\'from\' and \'to\' must be of the same type.')
    
    const begin = pnow()
    const interval = setInterval(() => {
        const t = mathClamp((pnow() - begin) / delay, 0, 1)
        let v = t === 1 ? to : from
        
        switch (typeof from) {
            case 'number':
            v = mathLerp(from, to, t)
            break
            case 'string':
            colorType(from) !== null && (v = colorLerp(from, to, t))
            break
        }
        
        obj[key] = afterLerpCB(v)
        
        if (t === 1) {
            clearInterval(interval)
        }
    })
}

// #endregion

// #region Internal declarations

const _rtDefaultStyleSheet = document.createElement('style')
document.body.append(_rtDefaultStyleSheet)
_rtDefaultStyleSheet.innerHTML = `
 :root {
 --rt-color1: #ccc4;
 --rt-color2: linear-gradient(to bottom, #070707 0%, #555 100%);
 --rt-color3: #000;
 --rt-color4: #eee;
 }
 
 .win {
 position: fixed;
 padding: 2px;
 background: var(--rt-color2);
 color: var(--rt-color4);
 border: 2px inset var(--rt-color1);
 border-radius: 4px;
 display: flex;
 flex-direction: column;
 overflow: hidden;
 }
 
 .win.minimized {
 height: auto !important;
 }
 
 .win.minimized .win-body {
 display: none;
 }
 
 .win.grabbed .win-head {
 cursor: grabbing;  
 }
 
 .win-head {
 display: flex;
 padding: 0.2rem;
 width: 100%;
 cursor: grab;
 }
 
 .win-name {
 flex: 1
 }
 
 .win-actions {
 justify-self: flex-end;
 }
 
 .win-minimize,
 .win-close {
 padding: 0 4px;
 width: 32px;
 cursor: pointer;
 border-radius: 4px;
 }
 
 .win-minimize {
 background: none;
 color: var(--rt-color4);
 }
 
 .win-close {
 background: #b22;
 border-color: #b22;
 }
 
 .win-body {
 padding: 2px;
 background: var(--rt-color3);
 width: 100%;
 height: 100%;
 border: 2px inset var(--rt-color1);
 border-radius: 4px;
 overflow-y: auto;
 }`

// #endregion

// #region [Experimental]

const rtExperimental = {
    assetPatternCheckBoard,
    assetStyles
}

function assetPatternCheckBoard(
    colors = ['#000', '#111'],
    cellW = 32,
    cellH = 32,
    cols = 2,
    rows = 2
) {
    return gfxCreateGraphic(cellW * cols, cellH * rows, ctx => {
        for (let y = 0, i = 0; y < rows; i++, y++) {
            for (let x = 0; x < cols; i++, x++) {
                ctx.fillStyle = colors[i % colors.length]
                ctx.fillRect(x * cellW, y * cellH, cellW, cellH)
            }
        }
    })
}

function _cssMetric(value, metric = 'px') {
    return typeof value === 'number' ? value + metric : value
}

const _sBuilderSSheet = document.createElement('style')
document.body.append(_sBuilderSSheet)

function assetStyles(style = '', _class = 'rt-' + randID(32)) {
    return {
        center() {
            return assetStyles(
                (style += 'display:flex;align-items:center;justify-content:center;'),
                _class
            )
        },
        col(gap = 4) {
            return assetStyles(
                (style += `display:flex;flex-direction:column;gap:${_cssMetric(gap)};`),
                _class
            )
        },
        row(gap = 4) {
            return assetStyles(
                (style += `display:flex;flex-direction:row;gap:${_cssMetric(gap)};`),
                _class
            )
        },
        grid(cols = 'auto', rows = 'auto', gap = 4) {
            return assetStyles(
                (style += `display:grid;grid-template-columns:repeat(${cols},1fr);grid-template-rows:repeat(${rows},1fr);gap:${_cssMetric(
                    gap
                )};`),
                _class
            )
        },
        fill() {
            return assetStyles((style += 'width:100%;height:100%;'), _class)
        },
        pointer() {
            return assetStyles((style += 'cursor:pointer;'), _class)
        },
        bg(bg = colorRandHSL()) {
            return assetStyles((style += `background:${bg};`), _class)
        },
        color(color = colorRandHSL()) {
            return assetStyles((style += `color:${color};`), _class)
        },
        width(w = 'fit-content') {
            return assetStyles((style += `width:${_cssMetric(w)};`), _class)
        },
        height(h = 'fit-content') {
            return assetStyles((style += `height:${_cssMetric(h)};`), _class)
        },
        border(border, radius = 0) {
            return assetStyles(
                (style += `border:${border};border-radius:${_cssMetric(radius)};`),
                _class
            )
        },
        filter(filter) {
            return assetStyles((style += `filter:${filter};`), _class)
        },
        margin(m = 8) {
            return assetStyles((style += `margin:${_cssMetric(m)};`), _class)
        },
        padding(p = 8) {
            return assetStyles((style += `padding:${_cssMetric(p)};`), _class)
        },
        custom(css) {
            return assetStyles(
                (style += strGet(css, -1) === ';' ? css : css + ';'),
                _class
            )
        },
        onHover(style) {
            _sBuilderSSheet.innerHTML += `.${_class}:hover{${style}}`
            return this
        },
        build(beautify = false) {
            const styleSet = new Set(style.split(';'))
            const styleMap = new Map()
            
            styleSet.forEach(style => {
                if (!style) return
                const [prop, value] = style.split(':')
                if (prop && value) styleMap.set(prop, value)
                })
            
            if (beautify)
                return (
                [...styleMap.entries()].map(([k, v]) => k + ': ' + v).join(';\n') +
                ';'
            )
            return (
                [...styleMap.entries()].map(([k, v]) => k + ':' + v).join(';') + ';'
            )
        },
        apply(element) {
            _sBuilderSSheet.innerHTML += `.${_class}{${this.build()}}`
            element.classList.add(_class)
        }
    }
}

// #endregion

// Toggle the comments below to switch from no-modules, es6 and node.js modules
/*
const _ignore_notUsingModules = {
// export {
// const module.exports = {
QuadTree,
AABB,
Point2D,
Point3D,
Collider,
RayCaster,
PerlinNoise,
Color,
Grid2D,
Grid3D,
// StateMemory,
StateMachine,
Roll,
Vec2D,
CellularAutomata,
WaveFunctionCollapse,
RandomWalk,
installPRNG,
installInt16PCRN,
installGFX,
installScreen,
installDepthRenderer,
installGridRenderer,
installCamera,
installKBM,
installMobileGP,
installMotionHandler,
installLoop,
installSpriteHandler,
installCoolDownH,
mathPI: PI,
mathONE_OVER_PI: ONE_OVER_PI,
mathHALF_PI: HALF_PI,
mathQUARTER_PI: QUARTER_PI,
mathTWO_PI: TWO_PI,
mathSQRT2: SQRT2,
mathSign,
mathSnap,
mathLerp,
mathLerpCurve,
mathScale,
mathDist,
mathDist2,
mathDist3,
mathDist4,
mathDistPointLine,
mathDistPointLine2,
mathPointTo,
mathPointTo2,
mathRadians,
mathDegrees,
mathClamp,
mathMin,
mathMax,
mathMinMax,
mathMinIndex,
mathMaxIndex,
mathMinMaxIndex,
mathSum,
mathAverage,
mathSmoothT,
vec,
vecRight,
vecLeft,
vecDown,
vecCopy,
vecNormal,
vecCross,
vecDot,
vecHad,
vecSet,
vecAdd,
vecSub,
vecMult,
vecDiv,
vecMag,
vecMag2,
vecSetMag,
vecPointTo,
vecNormalize,
vecInvert,
vecFromAngle,
vecRand,
vecRandAngle,
vecRotate,
vecApply,
vecHeading,
vecLimit,
vecSmoothLimit,
vecClamp,
vecLerp,
vecLerpVec,
vecLerpStable,
vecDist,
vecDist2,
vecToString,
rand,
randInt: randI,
randInt2: randI2,
randIntBetween: randIRange,
randFloat: randF,
randFloat2: randF2,
randFloatBetween: randFRange,
randId: randID,
randPoints,
randWeight,
randWeight2,
randWeight3,
randChar: randChar,
randCharBetween: randCharRange,
randLetter,
randLetterBetween: randLetterRange,
randItem,
randObjKey: randKey,
randObjValue: randValue,
colorDist,
colorDist2,
colorLerp,
colorLerp2,
colorMakeRGB,
colorMakeHSL,
colorMakeOkLAB,
colorParseHex,
colorParse,
colorType,
colorRandRGB,
colorRandHSL,
colorGetBrightness,
colorHEXtoRGB,
colorHEXtoHSL,
colorHEXtoOkLAB,
colorRGBtoHEX,
colorRGBtoHSL,
colorRGBtoOkLAB,
colorHSLtoHEX,
colorHSLtoRGB,
colorHSLtoOkLAB,
colorOkLABToHEX,
colorOkLABToHSL,
colorOkLABtoRGB,
colorAddLightness,
fileDownload,
fileLoadText,
sfxPlay,
sfxStop,
sfxStopAll,
sfxPause,
sfxPauseAll,
sfxResume,
sfxResumeAll,
meetPointRect,
meetPointRectBool,
meetRectRect,
meetRectRectBool,
meetRectCircle,
meetRectCircleBool,
meetRectTriangleBool,
meetRectDiamondBool,
meetPointCircle,
meetPointCircleBool,
// meetPointCircle2Bool,
meetCircleCircle,
meetCircleCircleBool,
// meetCircleCircle2Bool,
meetPointTriangleBool,
meetPointQuadBool,
meetLineLine,
meetLineLineBool,
loadScript,
loadScriptCB,
loadImage,
loadImageCB,
loadAudio,
loadAudioCB,
loadVideo,
loadVideoCB,
loadWebcam,
loadWebcamCB,
loadJSON,
loadJSONCB,
loadText,
loadTextCB,
loadTextEncoded,
loadTextEncodedCB,
domElement,
domDiv,
domCanvas,
domVideo,
domButton,
domP,
domSlider,
domSelect,
domModal,
domDnDWindow,
domRemoveListeners,
gfxCreateGraphic,
gfxCreatePattern,
inputToClipboard,
inputGetFile,
inputGetText,
strGet,
strCharIsVowel,
strCharIsConsonant,
strCount,
strSetChar,
strConcatAt,
strIndexOfClosest,
strIndexOfLeftRepeat,
strIndexOfRightRepeat,
strIndexOfClosestRepeat,
strIsLower,
strIsUpper,
strToPascalCase,
strToCamelCase,
strToTitleCase,
strToFlatCase,
strToSnakeCase,
strToConstantCase,
strToKebabCase,
strToMacroCase,
strToTrainCase,
arrGet,
arrCount,
arrShuffle,
arrSwap,
arrCollapse,
arrExpand,
arrChunkify,
arrIntersection,
arr1D,
arr2D,
arrND,
arrTraverse2D,
cnvFromImage,
cnvCut,
cnvResize,
cnvScale,
cnvSplitSheet,
cnvEachPixel,
cnvEachPixelXY,
cnvPixelate,
cnvColorKey,
cnvLowerPalette,
cnvMultiply,
cnvUsePalette,
cnvGrayscale,
cnvToImage,
cnvToImageCB,
cnvGetPixel,
cnvGetCluster,
cnvGetClusterCenter,
timerCreate,
timerUpdate,
timerStop,
timerStopAll,
timerPause,
timerPauseAll,
timerResume,
timerResumeAll,
efxVignette,
efxTint,
rtGetBrowserName,
rtDelay,
rtGetClasses,
rtEquals,
rtWaitForUserInteraction,
rtMobileRefreshOFF,
rtMobileRefreshON,
rtMobileRefreshAuto,
rtMobileScaleOFF,
rtMobileScaleON,
rtDefaultMobileScale,
rtLocalGet,
rtLocalSet,
rtLocalUse,
rtGetType,
rtGetTypeDescMedium,
rtGetTypeDescSmall,
rtEnum,
rtEnumNamed,
rtTokenize,
rtDefaultStylesOFF,
rtDefaultStylesON,
rtRange,
rtRemoveComments,
rtRemoveJSDoc,
rtMatch,
rtExperimental
}
*/
