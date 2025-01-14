---
title: Modern Computer Graphics Course Note
date: 2021-9-15
mathjax: true
tags: [Course note, Computer graphics, Mathematics]
---

Note for the course GAMES 101 - Modern Computer graphics. This course will gives a comprohensive introduction to four foundamental areas of modern computer graphics: 1. rasterization, 2. geometry, 3. ray tracing, 4. animation and simulation. 

The course is orignally given in Chinese. But the course notes are available in English. 

<!-- more -->


## 1. Overview of Computer Graphics

### Why study computer graphics?

#### Fundamental intellectual challenges

    * Creates and interacts with realistic virtual world
    * Requires understanding of all aspects of physical world
    * New computing methods, displays, technologies

#### Technical challenges

    * Math of projections, curves, surfaces
    * Physics of lighting and shading
    * Representing / operating shapes in 3D
    * Animation / simulation
    * 3D graphics software programming and hardware

### Course topics

#### Rasterization

    * Project geometry primitives (3D triangles / polygons) onto the screen
    * Break projected primitives into fragments (pixels)
    * Gold standard in Video Games (Real-time applications)

#### Curves and meshes

    * How to represent geometry in Computer Graphics

#### Ray tracing

    * Shoot rays from the camera though each pixel
        * Calculate intersection and shading
        * Continue to bounce the rays till they hit light sources
    * Gold standard in animations / movies (offline applications)

#### Animation / simulation

    * Key frame Animation
    * Mass-spring system

## 2. Review of Linear Algebra

### Graphics' Dependencies

* Basic mathematics
  * Linear algebra, calculus, statistics
* Basic physics
  * Optics, mechanics
* Mics
  * Signal processing
  * Numerical analysis
* A bit of aesthetics

### Cross product in graphics

* Determine left or right
* Determine inside or outside

## 3. Transformation

### Why study transformation

* Modeling
  * Translation
  * Scaling
* Viewing
  * (3D to 2D) projection

### 2D transformations

* Representing transformations using matrices
* Rotation, scale, shear

#### Scale transform

$$
\begin{bmatrix}
x'\\y'
\end{bmatrix} = 
\begin{bmatrix}
s & 0\\
0 & s\\
\end{bmatrix}
\begin{bmatrix}
x\\y
\end{bmatrix}
$$

#### Non-uniform scale transform

$$
\begin{bmatrix}
x'\\y'
\end{bmatrix} = 
\begin{bmatrix}
s_x & 0\\
0 & s_y\\
\end{bmatrix}
\begin{bmatrix}
x\\y
\end{bmatrix}
$$

#### Reflection matrix

Horizontal reflection
$$
\begin{bmatrix}
x'\\y'
\end{bmatrix} = 
\begin{bmatrix}
-1 & 0\\
0 & 1\\
\end{bmatrix}
\begin{bmatrix}
x\\y
\end{bmatrix}
$$

#### Shear matrix

For example, horizontal shift is 0 at $y=0$, horizontal shift is $a$ at $y=1$. Vertical shift is always 0.
$$
\begin{bmatrix}
x'\\y'
\end{bmatrix} = 
\begin{bmatrix}
1 & a\\
0 & 1\\
\end{bmatrix}
\begin{bmatrix}
x\\y
\end{bmatrix}
$$

#### Rotate (about the origin $(0, 0)$, count-clockwise by default)

$$
\begin{bmatrix}
x'\\y'
\end{bmatrix} = 
\begin{bmatrix}
\cos\theta & -\sin\theta\\
\sin\theta & \cos\theta\\
\end{bmatrix}
\begin{bmatrix}
x\\y
\end{bmatrix}
$$

#### Linear transformation = Matrix multiplication

### Homogeneous coordinate

#### Translation

$$
\begin{bmatrix}
    x'\\y'
    \end{bmatrix} = 
    \begin{bmatrix}
    x\\y
    \end{bmatrix} + \begin{bmatrix}
    t_x\\t_y
    \end{bmatrix}
$$

#### Why homogeneous coordinates

##### Translation cannot be represented in matrix form

$$
\begin{bmatrix}
  x'\\y'
  \end{bmatrix} = 
  \begin{bmatrix}
  a & b\\
  c & d\\
  \end{bmatrix}
  \begin{bmatrix}
  x\\y
  \end{bmatrix} + \begin{bmatrix}
  t_x\\t_y
  \end{bmatrix}
$$

* But we don't want translation to be a special case
  * Is there a unified way to represent all transformations (and what is the cost)?

##### Solution: Homogenous coordinates

* Add a third coordinate ($w$-coordinate)
  * 2D point = $(x, y, 1)^T$
  * 2D vector = $(x, y, 0)^T$
    * The reason why $w=0$ for 2D vector is that the vector is constant over translation
  * Valid operatioin if $w$-coordinate of result is 1 or 0
    * vector + vector = vector
    * point  - point  = vector
    * point  + vector = point
    * point  + point  = midpoint (see following definition)
  * In homogeneous coordinates, $ 
    \begin{bmatrix} 
    x\\y\\w
    \end{bmatrix}
    $ is the 2D point $
    \begin{bmatrix} 
    x/w\\y/w\\1
    \end{bmatrix}
    , w \neq 0$
* Matrix representation of translations:
  
  $$
  \begin{bmatrix} 
  x'\\y'\\w'
  \end{bmatrix}
  = \begin{bmatrix} 
  1 & 0 & t_x \\
  0 & 1 & t_y \\
  0 & 0 & 1
  \end{bmatrix} \cdot \begin{bmatrix} 
  x\\y\\1
  \end{bmatrix} = \begin{bmatrix} 
  x + t_x\\ y + t_y \\ 1
  \end{bmatrix}
  $$

#### Affine transformations

##### Affine map = linear map + translation

$$
\begin{bmatrix}
  x'\\y'
  \end{bmatrix} = 
  \begin{bmatrix}
  a & b\\
  c & d\\
  \end{bmatrix}
  \begin{bmatrix}
  x\\y
  \end{bmatrix} + \begin{bmatrix}
  t_x\\t_y
  \end{bmatrix}
$$

##### Using homogenous coordinates

$$
\begin{bmatrix}
    x'\\y'\\1
    \end{bmatrix} = 
    \begin{bmatrix}
    a & b & t_x\\
    c & d & t_y\\
    0 & 0 & 1 \\
    \end{bmatrix}\cdot
    \begin{bmatrix}
    x\\y\\1
    \end{bmatrix}
$$

### Inverse transform

$M^{-1}$ is the inverse of transform $M$ in both a matrix and geometric sense

### Composing transformations

#### Transform ordering matters

* Matrix multiplication is not commutative
* Note that matrices are applied right to left

#### Sequence of affine transforms $A_1, A_2, A_3$​, ...

* Compose by matrix multiplication
  * Very important for performance
    * Pre-multiply $n$ matrices to obtain a single matrix representing combined transform

#### Decomposing complex transforms

* How to rotate an angle $\alpha$ around a given point $c$?
  1. Translate center to origin
  2. Rotate
  3. Translate back
     Matrix representation?
     
     $$
     T(c) \cdot R(\alpha) \cdot T(-c)
     $$

### 3D transforms

Use homogeneous coordinates again:

* 3D point = $(x, y, z, 1)^T$
* 3D vector = $(x, y, z, 0)^T$

In general, $(x, y, z, w)$ is the 3D point: $(x/w, y/w, z/w)$ for $w\neq 0$

Use $4\times 4$ matrices for affine transformations
$$
\begin{bmatrix}
    x'\\y'\\z'\\1
    \end{bmatrix} = 
    \begin{bmatrix}
    a & b & c & t_x\\
    d & e & f & t_y\\
    g & h & i & t_z\\
    0 & 0 & 0 & 1 \\
    \end{bmatrix}\cdot
    \begin{bmatrix}
    x\\y\\z\\1
    \end{bmatrix}
$$

### 3D transformations

#### Scale

$$
S(s_x, s_y, s_z) = 
    \begin{bmatrix}
    s_x & 0 & 0 & 0\\
    0 & s_y & 0 & 0\\
    0 & 0 & s_z & 0\\
    0 & 0 & 0   & 1 \\
    \end{bmatrix}
$$

#### Translation

$$
T(t_x, t_y, t_z) = 
    \begin{bmatrix}
    1 & 0 & 0 & t_x\\
    0 & 1 & 0 & t_y\\
    0 & 0 & 1 & t_z\\
    0 & 0 & 0 & 1 \\
    \end{bmatrix}
$$

#### Rotation around x-, y-, or z-axis

$$
R_x(\alpha) = 
    \begin{bmatrix}
    1 & 0 & 0 & 0\\
    0 & \cos\alpha & -\sin\alpha & 0\\
    0 & \sin\alpha & \cos\alpha & 0\\
    0 & 0 & 0   & 1 \\
    \end{bmatrix}
$$

$$
R_y(\alpha) = 
    \begin{bmatrix}
    \cos\alpha & 0 & \sin\alpha & 0\\
    0 & 1 & 0 & 0\\
    -\sin\alpha & 0 & \cos\alpha & 0\\
    0 & 0 & 0   & 1 \\
    \end{bmatrix}
$$

$$
R_x(\alpha) = 
    \begin{bmatrix}
    \cos\alpha & -\sin\alpha & 0 & 0\\
    \sin\alpha & \cos\alpha & 0 & 0\\
    0 & 0 & 1 & 0\\
    0 & 0 & 0   & 1 \\
    \end{bmatrix}
$$

Compose any 3D rotation from $R_x, R_y, R_z$? 
$$
R_{xyz} (\alpha, \beta, \gamma) = R_x(\alpha)R_y(\beta)R_z(\gamma)
$$

* So-called Euler angles
* Often used in flight simulators: roll, pitch, yaw

### Rodrigues' rotation formula

Rotation by angle $\alpha$ around axis $n$ 
$$
R(\vec{n}, \alpha) = \cos(\alpha) \vec{I} + (1 - \cos(\alpha)) \vec{n}\vec{n}^T + \sin(\alpha) \begin{bmatrix}
0 & -n_z & n_y \\
n_z & 0 & -n_x \\
-n_y & n_x & 0\\
\end{bmatrix}
$$

### View / camera transformation

#### What is view transformation?

* Think about how to take a photo
  * Find a good place and arrange people (model transformation)
  * Find a good "angle" to put the camera (view transformation)
  * Cheese! (projection transformation)

#### How to perform view transformation?

* Define the camera first
  * Position $\vec{e}$
  * Look-at / gaze direction $\vec{g}$
  * Up direction $\vec{t}$ (assuming perpendicular to look-at)
* Key observation
  * If the camera and all objects move together, the "photo" will be the same
  * How about that we always transform the camera to 
    * The origin, up at Y, look at -Z
    * And transform the objects along with the camera
* Transform the camera by $M_{view}$ 
  * So it's located at the origin, up at $Y$, look at $-Z$
  * $M_{view}$ in math:
    * Let's write $M_{view} = R_{view} T_{view}$
    * Translates $e$ to origin
      
      $$
      T_{view} = \begin{bmatrix} 
      1 & 0 & 0 & -x_e \\
      0 & 1 & 0 & -y_e \\
      0 & 0 & 1 & -z_e \\
      0 & 0 & 0 &  1
      \end{bmatrix}
      $$
    * Rotates $g$ to $-Z$
    * Rotates $t$ to $T$
    * Rotates $g\times t$ to $X$
      * Consider their inverse rotation: $X$ to $(g\times t)$, $Y$ to $t$, $Z$ to $-g$
        
        $$
        R_{view}^{-1} = \begin{bmatrix} 
        x_{\vec{g}\times \vec{t}} & x_t & x_{-g} & 0 \\
        y_{\vec{g}\times \vec{t}} & y_t & y_{-g} & 0 \\
        z_{\vec{g}\times \vec{t}} & z_t & z_{-g} & 0 \\
        0 & 0 & 0 &  1
        \end{bmatrix} \Rightarrow R_{view} = R_{view}^T = \begin{bmatrix} 
        x_{\vec{g}\times \vec{t}} & y_{\vec{g}\times \vec{t}} & z_{\vec{g}\times \vec{t}} & 0 \\
        x_t  & y_t & z_t &  0 \\
        x_{-g} & y_{-g} & z_{-g} & 0 \\
        0 & 0 & 0 &  1
        \end{bmatrix}
        $$
* Transform objects together with the camera
* Also known as ModelView Transformation

### Projection transformation

Projection in computer graphics

* 3D to 2D

#### Orthographic projection

##### The camera is considered located at infinite far away

* A simple way of understanding
  * Camera located at origin, looking at $-Z$, up at $Y$
  * Drop $Z$ coordinate
  * Translate and scale the resulting rectangle to $[-1, 1]^2$

##### In general

* We want to map a cuboid $[l, r]\times[b, t]\times[f, n]$ to the "canonical" cube $[-1, 1]^3$
* Method: slightly different orders to the "simple way"
  * Center cuboid by translating
  * Scale into "canonical" cube
* Transformation matrix
  * Translate (center to origin) first, then then scale (length / width / height to 2):
    
    $$
    M_{ortho} = \begin{bmatrix}
    \frac{2}{r-l} & 0 & 0 & 0 \\
    0 & \frac{2}{t-b} & 0 & 0 \\
    0 & 0 & \frac{2}{n-f} & 0 \\
    0 & 0 & 0 & 1
    \end{bmatrix} \begin{bmatrix}
    1 & 0 & 0 & -\frac{r+l}{2} \\
    0 & 1 & 0 & -\frac{t+b}{2} \\
    0 & 0 & 1 & -\frac{n+f}{2} \\
    0 & 0 & 0 & 1
    \end{bmatrix}
    $$
* Caveat
  * Looking at / along $-Z$ is making near and far not intuitive ($n>f$)
  * FYI: That is why OpenGL uses left hand coordinates

#### Perspective projection

* The camera is considered as a point at a certain distance
* Most common in computer graphics, art, visual system
  * Further objects are smaller
  * Parallel lines not parallel; converge to single point
* Recall: property of homogeneous coordinates
  * $(x, y, z, 1), (kx, ky, kz, k != 0), (xz, yz, z^2, z!=0)$ all represent the same point $(x, y, z)$ in 3D

##### How to do perspective projection

* First "squish" the frustum into a cuboid $(n \rightarrow n, f \rightarrow f)$, $M_{persp\rightarrow ortho}$
* Do orthographic projection ($M_{ortho}$, already known)
* In order to find a transformation
  * Recall the key idea: find the relationship between transformed point $(x', y', z')$ and the original points $(x, y, z)$: 
    
    $$
    \frac{y'}{y}=\frac{n}{z}\quad\quad \frac{x'}{x}=\frac{n}{z}
    $$
  * In homogeneous coordinates, 
    
    $$
    \begin{bmatrix}
    x\\ y\\ z\\ 1
    \end{bmatrix} \Rightarrow \begin{bmatrix}
    nx/z\\ ny/z\\ \text{unknown}\\ 1
    \end{bmatrix} \Rightarrow \text{Multiply by }z\Rightarrow \begin{bmatrix}
    nx\\ ny\\ \text{unknown}\\ z
    \end{bmatrix}
    $$
  * So the "squish" (persp to ortho) projection does this:
    
    $$
    M_{persp\rightarrow ortho}^{(4\times 4)} \begin{bmatrix}
    x\\ y\\ z\\ 1
    \end{bmatrix} = \begin{bmatrix}
    nx\\ ny\\ \text{unknown}\\ z
    \end{bmatrix}
    $$
    * It is already good enough to figure out part of $M_{persp\rightarrow ortho}$ 
      
      $$
      M_{persp\rightarrow ortho} = \begin{bmatrix}
      n & 0 & 0 & 0 \\
      0 & n & 0 & 0 \\
      ? & ? & ? & ? \\
      0 & 0 & 1 & 0
      \end{bmatrix}
      $$
    * Observation: the third row is responsible for $z'$
      * Any point on the near plane will not change
        
        $$
        M_{persp\rightarrow ortho}^{(4\times 4)} \begin{bmatrix}
        x\\ y\\ z\\ 1
        \end{bmatrix} = \begin{bmatrix}
        nx\\ ny\\ \text{unknown}\\ z
        \end{bmatrix} \Rightarrow \text{replace } z \text{ with }n\Rightarrow \begin{bmatrix}
        x\\ y\\ n\\ 1
        \end{bmatrix} \Rightarrow \begin{bmatrix}
        x\\ y\\ n\\ 1
        \end{bmatrix} == \begin{bmatrix}
        nx\\ ny\\ n^2\\ n
        \end{bmatrix}
        $$
        
        So the third row must be of the form $(0 \ 0 \ A \ B)$
        
        $$
        \begin{bmatrix}
        0 & 0 & A & B
        \end{bmatrix} \begin{bmatrix}
        x \\ y \\ n \\ 1
        \end{bmatrix} = n^2 \Rightarrow An + B = n^2
        $$
        
        Here $n^2$ has nothing to do with $x$ and $y$
      * Any point's $z$ on the far plane will not change
        
        $$
        \begin{bmatrix}
        0\\ 0\\ f\\ 1
        \end{bmatrix} \Rightarrow \begin{bmatrix}
        0\\ 0\\ f\\ 1
        \end{bmatrix} == \begin{bmatrix}
        0\\ 0\\ f^2\\ f
        \end{bmatrix}\Rightarrow Af + B = f^2
        $$
      * They give: $A= n+f$ and $B=-nf$
      * Finally, every entry in $M_{persp\rightarrow ortho}$ is filled

## 4. Rasterization

### Perspective projection

#### What is near plane's $l, r, b, t$?

* If explicitly specified, good

* Sometimes people prefer vertical field-of-view ($fovY$) and aspect ratio = width / height
  
  * Assume symmetry, i.e. $l = -r, b=-t$

* How to convert from $fovY$ and aspect to $l, r, b, t$?
  
  $$
  \tan\frac{fovY}{2} = \frac{t}{|n|}
  $$
  
  $$
  aspect = \frac{r}{t}
  $$

### What is after MVP?

* Model transformation (placing objects)
* View transformation (placing camera)
* Projection transformation
  * Orthographic projection (cuboid to "canonical" cube $[-1, 1]^3$)
  * Perspective projection (frustum to "canonical" cube)

#### Canonical cube to screen

* What is a screen?
  
  * An array of pixels
  * Size of the array: resolution
  * A typical kind of raster display

* Raster == screen in German
  
  * Rasterize == drawing onto the screen

* Pixel (FYI, short for "picture element")
  
  * For now: a pixel is a little square with uniform color
  * Color is a mixture of (red, green, blue)

* Defining the screen space
  
  * Slightly different from the "tiger book"
  * $(0,0)$ at the left-down corner. $x$-axis toward right. $y$-axis toward up
  * Pixels' indices are in the form of $(x, y)$, where both $x$ and $y$ are integers
  * Pixels' indices are from $(0,0)$  to $(width-1, height-1)$
  * Pixel $(x,y)$ is centered at $(x+0.5, y+0.5)$
  * The screen covers range $(0,0)$ to $(width, height)$

* Irrelevant to $z$

* Transform in $xy$-plane: $[-1, 1]^2$ to $[0, width]\times[0, height]$
  
  * Viewport transform matrix: 
    
    $$
    M_{viewport} = \begin{bmatrix}
    \frac{width}{2} & 0 & 0 & \frac{width}{2} \\
    0 & \frac{height}{2} & 0 & \frac{height}{2} \\
    0 & 0 & 1 & 0 \\
    0 & 0 & 0 & 1
    \end{bmatrix}
    $$

### Rasterization: Drawing to raster displays

#### Triangles - Fundamental shape primitives

##### Why triangles

* Most basic polygon
  * Break up other polygons
* Unique properties
  * Guaranteed to be planar
  * Well-defined interior
  * Well-defined method for interpolating values at vertices over triangle (barycentric interpolation)

#### What pixel values approximate a triangle?

* Input: position of triangle vertices projected on screen

* Output: set of pixel values approximating triangle

* A simple approach: sampling
  
  * Sampling a function: Evaluating a function at point is sampling. We can discretize a function by sampling 
  * Sampling is a core idea in graphics. We sample time (1D), area (2D), direction (2D), volume (3D) ...

* Thus define binary function: `inside(tri, x, y)`, here `x`, `y` are not necessarily integers
  
  ```
     inside (t, x, y) = 1 if Point (x, y) in triangle t
                        0 otherwise
  ```

#### Rasterization = Sampling a 2D indicator function:

```c
for (int x = 0; x < xmax; ++x) 
    for (int y = 0; y < ymax; ++y)
        image[x][y] = inside(tri, x + 0.5, y + 0.5);
```

* Evaluating `inside(tri, x, y)`:
  
  * Three cross products should give same sign
  * Edge cases: you can define the situation by yourself

* Do not check all pixels on the screen. Use an axis-aligned bounding box (AABB)
  
  * A faster way: incremental triangle traversal: suitable for thin and rotated triangles

* Will lead to aliasing (Jaggies)

### Antialiasing

#### Sampling

##### Sampling is Ubiquitous in computer graphics

* Photograph = Sampling image sensor plane
* Video = Sampling time

##### Sampling artifacts (errors / mistakes / inaccuracies) in computer graphics

* Jaggies (staircase pattern)
  * This is also an example of "aliasing" - a sampling error
* Moiré patterns in imaging
  * Occur because of skip odd rows and columns
* Wagon Wheel Illusion (False motion)
  * Problem with human eye - sampling in time slower than movement of an object
* Many more...
* Behind the aliasing artifacts
  * Signals are changing too fast (high frequency), but sampled too slowly

##### Antialiasing idea: Blurring (Pre-Filtering) before sampling

* Antialiased edges in rasterized triangle where pixel values take intermediate values

##### But why aliasing and pre-filtering?

1. Why undersampling introduces aliasing?
2. Why pre-filtering then samling can do antialiasing?

#### Fundamental reasons

##### Frequency domain

* Fourier transform
  * Represent a function as a weighted sum of sines and cosines
  * Fourier transform decomposes a signal into frequencies
    * Functions in spatial domain is Fourier transformed into new functions in frequency domain
  * From a function in frequency domain, we can see that:
    * For low-frequency signal: sampled adequately for reasonable reconstruction
    * High-frequency signal is insufficiently sampled:reconstruction incorrectly appears to be from a flow frequency signal
      * Undersampling creates frequency aliases
      * Two frequencies that are indistinguishable at a given sampling are called "aliases"

##### Filtering = Getting rid of certain frequency contents. Also, Filtering = Convolution (=Averaging)

* Convolution
  * Point-wise average on a sliding box
  * Convolution theorem
    * Convolution in the spatial domain is equal to multiplication in the frequency domain, and vice versa
      * Option 1:
        * Filter by convolution in the spatial domain
      * Option 2:
        * Transform to frequency domain (Fourier transform)
        * Multiply by Fourier transform of convolution kernel
        * Transform back to spatial domain (inverse Fourier)

##### Box filter

$$
\frac{1}{9} \begin{bmatrix}
 1 & 1 & 1 \\
 1 & 1 & 1 \\
 1 & 1 & 1 \\
 \end{bmatrix}
$$

* Box function = "Low pass" filter
  * Wider filter kernel = Lower Frequencies

##### Sampling = Repeating frequency contents

* Aliasing = Mixed frequency contents
  * Dense sampling = repeated frequency contents does not overlap
  * Sparse sampling = repeated frequency contents overlaps which gives aliasing

##### How can we reduce aliasing error?

* Option 1: Increase sampling rate
  * Essentially increasing the distance between replicas in the Fourier domain
  * Higher resolution displays, sensors, framebuffers
  * But: costly & may need very high resolution
* Option 2: Antialiasing
  * Making Fourier contents "narrower" before repeating
  * i.e. Filtering out high frequencies before sampling
    * Limiting, the repeating

#### A practical pre-filter

* A 1 pixel-width box filter (low pass, blurring)
* Antialiasing by computing average pixel value
  * In rasterizing one triangle, the average value inside a pixel area of $f(x, y)$ = `inside(triangle, x, y)` is equal to the area of the pixel covered by the triangle
* Antialiasing by supersampling (MSAA)
  * Supersampling
    * Approximate the effect of the 1-pixel box filter by sampling multiple locations within a pixel and averaging their values
    * Step 2: Average the NxN samples "inside" each pixel
  * No free lunch! What is the cost of MSAA?
    * More computation
* More antialiasing method: Milestones
  * FXAA (Fast Approximate AA)
  * TAA (Temporal AA)
  * Super resolution / super sampling
    * From low resolution to high resolution
    * Essentially still "not enough samples" problem
    * DLSS (Deep Learning Super Sampling)

### Visibility / occlusion

#### Painter's algorithm

* Inspired by how painters paint: Paint from back to front, overwrite in the framebuffer
* Requires sorting in depth ($O(n +log n)$ for $n$ triangles)
* Can have unresolvable depth order (ordering in a cycle)
* Not very good, thus we use Z-buffer algorithm

#### Z-buffering

* Idea
  * Store current min. z-value for each sample (pixel)
  * Needs an additional buffer for depth values
    * Frame buffer stores color values
    * Depth buffer (z-buffer) stores depth
* Important: For simplicity we suppose that $z$ is always positive
  * Smaller $z$ is closer
* The Z-Buffer algorithm
  * Initialize depth buffer to $\infty$
  * During rasterization:
    
    ```c++
    for (each triangle T)
      for (each sample (x, y, z) in T) 
        if (z < zbuffer[x, y])
          framebuffer[x, y] = rgb;
          zbuffer[x, y] = z;
        else
          // do nothing, this sample is occluded
    ```
* Z-Buffer complexity
  * Complexity
    * $O(n)$ for $n$ triangles (assuming constant coverage)
      * Assuming that each triangle is not too big
    * How is it possible to sort $n$ triangles in linear time? 
      * Because we did not sort them, just find the minimum
  * Drawing triangles in different orders?
    * Working fine
* Most important visibility algorithm
  * Implemented in hardware for all GPUs

## 5. Shading

### Definition

* In Meriam-Webster dictionary
  * The darkening or coloring of an illustration or diagram with parallel lines or a block of color
* In this course
  * The process of applying a material to an object

### Properties of shading

* Shading is local: 
  * Compute light reflected toward camera as a specific shading point
  * Shading will ignore all other objects
  * Thus no shadows will be generated 
    * Shading != shadow
* Inputs: 
  * Viewer direction: $\vec{v}$
  * Surface normal: $\vec{n}$
  * Light direction: $\vec{l}$ (for each of many lights)
  * Surface parameters: color, shininess, ...
  * $\vec{v}, \vec{n}, \vec{l}$ are all unit vector

### A simple shading model (Blinn-Phong reflectance model)

#### Perceptual observations and modeling

* Specular highlights
  * Intensity depends on view direction
    * Bright near mirror reflection direction
    * $\vec{v}$ close to mirror direction $\iff$ half vector near normal 
      Measure "near" by dot product of unit vectors
      
      $$
      \vec{h} = \text{bisector}(\vec{v}, \vec{l}) = \frac{\vec{v} + \vec{l}}{||\vec{v} + \vec{l}||}
      $$
      
      $$
      L_s = k_s (I/r^2) \max(0, \vec{n}\cdot \vec{h})^p
      $$
      
      Here 
      * $L_s$: specularly reflected light
      * $k_s$: specular coefficient
      * $p$: the cosine decreases too slowly, thus increasing $p$ narrows the reflection lobe
        * Usually set to 100-200 in Blinn-Phong model
* Diffuse reflection
  * Light is scattered uniformly in all directions
    * Surface color is the same for all viewing directions
  * But how much light (energy) is received?
    * Lambert's cosine law
      * In general, light per unit area is proportional to $\cos\theta = \vec{l}\cdot \vec{n}$
    * Lambertian (Diffuse) shading: shading independent of view direction
      
      $$
      L_d = k_d (I/r^2) \max(0, \vec{n}\cdot\vec{l})
      $$
      
      Here:
      * $L_d$: diffusely reflected light
      * $k_d$: diffuse coefficient (color)
      * $(I/r^2)$: energy arrived at the shading point
      * $\max(0, \vec{n}\cdot\vec{l})$: energy received by the shading point
* Ambient lighting
  * Shading that does not depend on anything
    * Add constant color to account for disregarded illumination and fill in black shadows
    * This is approximation / fake!
  * Formula:
    
    $$
    L_a = k_a I_a
    $$
    
    Here:
    * $L_a$: reflected ambient light
    * $k_a$: ambient coefficient

#### The final mode

Ambient + Diffuse + Specular = Blinn-Phrong reflection
$$
L = L_a + L_d + L_s
$$

### Shading frequencies

#### Shade each triangle (flat shading)

* Triangle face is flat - one normal vector
* Not good for smooth surfaces

#### Shade each vertex (Gouraud shading)

* Interpolate colors from vertices across triangle
* A little better than flat shading
* Each vertex has a normal vector

##### Defining per-vertex normal vectors

* Best to get vertex normals from the underlying geometry
  * e.g. consider a sphere
* Otherwise have to infer vertex normals from triangle faces
  * Simple scheme: average surrounding face normals
    
    $$
    N_v=\frac{\sum_i N_i}{||\sum_i N_i||}
    $$

#### Shade each pixel (Phone shading)

* Interpolate normal vectors across each triangle
* Compute full shading model at each pixel
* Not the Blinn-Phong reflectance model

##### Defining per-pixel normal vectors

* Barycentric interpolation of vertex normals
* Don't forget to normalize the interpolated directions

### Graphics (Real-time rendering) pipeline

1. Application => Input is vertices in 3D
2. Vertex processing => Vertices positioned in screen space
3. Triangle processing => Triangle positioned in screen space
4. Rasterization => Fragments (one per covered sample)
5. Fragment processing => Shaded fragments
6. Framebuffer operations => Output: image (pixels)
7. Display

#### Graphic pipeline implementation: GPUs

* Specialized processors for executing graphics pipeline computations
* Heterogeneous, Multi-core processor
  * Modern GPUs offer $\approx$ 2 - 4 Tera-FLOPs of performance for executing vertex and fragment shader programs

### Shader programs

* Program vertex and fragment processing stages

* Describe operation on a single vertex (or fragment)

* Shader function executes once per fragment

* Outputs color of surface at the current fragment's screen sample position

* For example a GLSL fragment shader program. This shader performs a texture lookup to obtain the surface's material color at this point, then performs a diffuse lighting calculation
  
  ```glsl
  uniform sampler2D myTexture;            // program parameter
  uniform vec3 lightDir;                  // program parameter
  varying vec2 uv;                        // per fragment value (interp. by rasterizer)
  varying vec3 norm;                      // per fragment value (interp. by rasterizer)
  
  void diffuseShader（） {
    vec3 kd;
    kd = texture2d(myTexture, uv);                    // material color from texture
    kd *= clamp(dot(-lightDir, norm), 0.0, 1.0);      // Lambertian shading model
    gl_FragColor = vec4(kd, 1.0);                     // output fragment color
  }  
  ```

#### Goal: Highly complex 3D scenes in Realtime

* 100's of thousands to millions of triangles in a scene
* Complex vertex and fragment shader computations
* High resolution (2 - 4 megapixel + supersampling)
* 30 - 60 frames per second (even higher for VR)

### Texture mapping

* Surfaces are 2D
  * Surface lives in 3D world space
  * Every 3D surface point also has a place where it goes in the 2D image (texture)
* Visualization of texture coordinates
  * Each triangle vertex is assigned a texture coordinate $(u,v)$
* Textures can be used multiple times (tiled)

#### Interpolation across triangles: Barycentric coordinates

##### Interpolation across triangles

* Why do we want to interpolate?
  * Specify values at vertices
  * Obtain smoothly varying values across triangles
* What do we want to interpolate?
  * Texture coordinates, colors, normal vectors, ...
* How do we do interpolation?
  * Barycentric coordinates

##### Barycentric coordinates

* A coordinate system for triangles $(\alpha, \beta, \gamma)$:
  * Every point $(x, y)$ in the surface of this triangle can be computed with 
    
    $$
    (x,y ) = \alpha A+ \beta B + \gamma C
    $$
    
    Here $A, B, C$ are coordinates of vertices of the triangle and $\alpha+\beta+\gamma = 1$
    The point is inside the triangle if all three coordinates are non-negative
* Geometric viewpoint - proportional areas, for a point $P$ in the triangle:
  
  $$
  \alpha = \frac{Area(PBC)}{Area(ABC)}
  $$
  
  $$
  \beta = \frac{Area(PAC)}{Area(ABC)}
  $$
  
  $$
  \gamma = \frac{Area(PAB)}{Area(ABC)}
  $$
  
  What is the barycentric coordinate of the centroid?: $(1/3, 1/3, 1/3)$
* There is also a formula for any point which can be found on all kinds of documents

##### Using Barycentric coordinates

* Linear interpolate values at vertices
* To get the value $V$ inside a triangle with values $V_A, V_B, V_C$ at its vertices
  
  $$
  V =  \alpha V_A+ \beta V_B + \gamma V_C
  $$
  
  $V_A, V_B, V_C$ can be positions, texture coordinates, color, normal, depth, material attributes, ...
* However, barycentric coordinates are not invariant under projection

### Applying textures

#### Simple texture mapping: diffuse color

```
for each rasterized screen sample (x, y):
  (u, v) = evaluate texture coordinate at (x, y);
  texcolor = texture.sample(u, v);
  set sample's color to texcolor;
```

#### Texture magnification (What if the texture is too small?)

##### Easy case

* Generally don't want this - insufficient texture resolution
* A pixel on a texture - a texel
* Bilinear interpolation
  * Want to sample texture value `f(x, y)`  at a non-integer position
  * Take 4 nearest sample locations and fractional offsets to these 4 locations
  * Linear interpolation (1D):
    * $lerp (x, v_0, v_1) = v_0 + x (v_1-v_0)$
  * Two helper lerps (horizontal):
    * $u_0 = lerp(s, u_{00}, u_{10})$
    * $u_1 = lerp(s, u_{01}, u_{11})$
  * Fianl vertical lerp, to get result: 
    * $f(x, y) = lerp(t, u_0, u_1)$
  * Bilinear interpolation usually gives pretty good results at reasonable costs

##### Hard case: What if the texture is too large?

* Point sampling texture
  * Upsampling: magnification
  * Downsampling: minification
* Will supersampling do antialiasing?
  * Yes, high quality but costly
  * When highly minified, many texels in pixel footprint
  * Signal frequency too large in a pixel
  * Need even higher sampling frequency
* Let's understand this problem in another way
  * What if we don't sample
  * Just need to get the average value within a range
* Point query vs range query

##### Mipmap

* Allowing (fast, approximate, square) range queries
* "Mip" comes from the Latin "multum in parvo", meaning a multitiude in a small space
  * Mip hierarchy
* Storage overhead: $4/3$ times of the original picture
* Trilinear interpolation
  * Linear interpolation based on continuous mapmap value
* Mipmap limitations
  * Overblur
    * Partially solved by anisotropic filtering
      * Better for rectangle area but not un-regular area
      * Storage overhead: $3$ times of the original picture
    * Slowly solved by EWA filtering
      * Use multiple lookups
      * Weighted average
      * Mipmap hierarchy still helps
      * Can handle irregular footprints

### Many, many uses for texturing

* In modern GPUs, texture = memory + range query (filtering)
  * General method to bring data to fragment calculations
* Many applications
  * Environment lightnng
  * Store microgeometry
  * Procedural textures
  * Solid modeling
  * Volume rendering
  * ...

#### Cube map

* A vector maps to cube point along that direction. The cube is textured with 6 squares
  * Gives much less distortioin
  * Need dir -> face computation

### Textures can affect shading

#### Textures doesn't have to only represent colors

* What if it stores the height / normal? 
* Bump / normal mapping
* Fake the detailed geometry

#### Bump mapping

* Normal mapping
* Adding surface detail without adding more triangles
  * Perturb surface normal per pixel (for shading computations only)
  * "Height shift" per texel defined by a texture
  * How to modify vector?
* How to perturb the normal (in flatland)
  * Original surface normal `n(p) = (0,1)`
  * Derivative at `p` is `dp = c * [h(p+1) - h(p)]`
  * Perturbed normal is then `n(p) = (-dp, 1).normalized()`
* How to perturb the normal in 3D
  * Original surface normal `n(p) = (0, 0, 1)`
  * Derivates at `p` are:
    * `dp/du = c1 * [h(u + 1) - h(u)]`
    * `dp/dv = c2 * [h(v + 1) - h(v)]`
  * Pertubed normal is `n = (-dp/du, -dp/dv, 1).normalized()`
  * Note that this is in local coordinate

#### Displacement mapping - a more advanced approach

* Uses the same texture as in bumping mapping
* But here, we actually moves the vertices
* Use much more triangle, thus resources

#### 3D Procedural noise + Solid modeling

* For example, Perlin noise

#### Provide percomputed shading

* For example, ambient occlusion texture map

### Shadows

* How to draw shadows using rasterization?
* Shadow mapping！

#### Shadow mapping

* An image-space algorithm
  * No knowledge of scene's geometry during shadow computation
  * Must deal with aliasing artifacts
* Key idea:
  * The points that are NOT in shadow must be seen both by the light and by the camera
* Pass 1: Render from light
  * Depth image from light source
* Pass 2A： project to light
  * Porject visible points in eye view back source
  * Reprojected depths match for light and eye, then visible
  * Reprojected depths from light and eye are not the same, then blocked
* Well known rendering technique
  * Basic shadowing technique for early animations and in EVERY 3D video game

##### Problems with shadow maps

* Hard shadows (point lights only)
* Quality depends on shadow map resolution (general blem with image-based techniques)
* Involves equaliy comparison of floating point depth values means issues of scale, bias, tolerance
* Hard shadows vs. soft shadows
  * 0 or 1 shadows
  * Non-binary shadows

## 6. Geometry

### Many ways to represent geometry

#### Implicit geometry

* For example:
  * Algebraic surface
  * Level sets
  * Distance functions
  * ...
* Based on classifying points
  * Points satisfy some specified relationship
  * E.g. sphere: all points in 3D, where $x^2 + y^2 + z^2 = 1$
  * More generally: $f(x, y, z) = 0$
* Sampling can be hard
  * What points lie on $f(x, y, z) = 0$
* Inside / outside test is easy
* Pros:
  * Compact description (e.g. a function)
  * Certain queries easy (inside object, distance to surface)
  * Good for ray-to-surface intersection 
  * For simple shapes, exact description / no sampling error
  * Easy to handle changes in topology (e.g. fluid)
* Cons:
  * Difficult to model complex shapes

##### More implicit representations in computer graphics

* Algebraic surfaces (Implicit)
  * Surface is zero set of a polynomial in $x, y, z$
  * More complex shapes?
* Constructive solid goemetry (CSG)
  * Combine implicit geometry via Boolean operations
* Distance functions
  * Instead of Booleans, gradually blend surfaces together using distance functions:
  * Giving minimum distance (could be signed distance) from anywhere to object
* Level set methods 
  * Closed-form equations are hard to describe complex shapes
  * Alternative: sotre a grid of values approximating function
  * Surface is found where interpolated values equal zero
  * Provides much more explicit control over shape (like a texture)
  * Level sets encode, e.g., constant tissue density
* Fractals
  * Exhibit self-similarity, detail at all scales
  * "Language" for describing natural phenomena
  * Hard to control shape

#### Explicit geometry

* For example:
  * Point cloud
  * Polygon mesh
  * Subdivision, NURBS
  * ...
* All points are given directly or via parameter mapping
  * Generally: $f: \mathbb{R}^2\rightarrow\mathbb{R}^3;\ (u,v)\implies (x,y,z)$
* Sampling is easy
  * What points lie on this surface? Just plug in $(u, v)$ values
* Inside / Outside test is hard

##### More explicit representations in computer graphics

* Point cloud 
  * Easiest representation: list of points `(x, y, z)`
  * Easily represent any kind of geometry
  * Useful for LARGE datasets (>> 1 point/pixel)
  * Often converted into polygon mesh
  * Difficult to draw in undersampled regions
* Polygon mesh 
  * Store vertices & polygons (often triangles or quads)
  * Eaier to do processing / simulation, adaptive sampling
  * The Wavefront Object file (.obj) format
    * Commonly used in graphics research
    * Just a text file that specifies vertices, normals, texture corrdinates and their connectivities

#### No "best" representation - geometry is hard

### Curves

#### Bézier curves

Defining cubis Bézier curve with tangents

##### Evaluating Bézier curves (de Casteljau algorithm)

* Consider three points (quadratic Bézier)
  * Repeat recursively
* Cubic Bézier curve - de Casteljau
  * Four input points in total
  * Same recursive line interpolations
* Albebraic formula
  * de Casteljau algorithm gives a pyramid of coefficients
  * Example: quadratic Bézier curve from three points
    
    $$
    \begin{aligned}
    b_0^1(t) &= (1-t) b_0 + t b_1\\
    b_1^1(t) &= (1-t) b_1 + t b_2 \\
    b_0^2(t) &= (1-t) b_0^1 + t b_1^t \\
    \end{aligned}
    $$
  * General algebraic formula
    * Bernstein form of a Bézier curve of order $n$:
      
      $$
      b^n(t) = b_0^n (t) = \sum_{j=0}^n b_j B_j^n (t)
      $$
      
      here
      * $b^t(t)$ is the Bézier curve of order $n$ (vector polynomial of degree $n$)
      * $b_j$ is the Bézier control points (vector in $\mathbb{R}^N$)
      * $B_j^n(t)$ is the Berstein polynomial (scalar polynomial of degree $n$)
        * Which is:
          
          $$
          B_i^n (t) = \binom{n}{i} t^i (1-t)^{n-i}
          $$
  * Properties of Bézier curves
    * Interpolates endpoints
      * For cubic Bézier: $b(0) = b_0$; $b(1) = b_3$
    * Tangent to end segments
      * Cubic case: $b'(0) = 3(b_1-b_0)$; $b'(1) = 3(b_3-b_2)$
    * Affine transformation property
      * Transform curve by transforming control points
    * Convex hull property 
      * Curve is within convex hull of control points

##### Piecewise Bézier curves

* Higher-order Bézier curves? 
  * Very hard to control
* Piecewise Bézier curves
  * Instead, chain many low-order Bézier curve. Piecewise cubic Bézier is the most common technique. Widely used
  * Continuity:
    * $C^0$ continuity: $a_n = b_0$
    * $C^1$ continuity: $a_n = b_0 = \frac{1}{2} (a_{n-1} + b_1)$

##### Other types of splines

* Spline
  * A continuous curve constructed so as to pass through a given set of points and have a certain number of continuous derivatives
  * In short, a curve under control
* B-splines
  * Short for basis splines
  * Require more information than Bézier curves
  * Satisfy all important properties that Bézier curves have (i.e. superset)

### Bézier surfaces

* Extend Bézier curves to surfaces
* Bicubic Bézier surface patch
  * $4\times 4$ points to form a surface

#### Evaluating Bézier surfaces

* Evaluating surface position for parameters $(u, v)$
  * For bi-cubic Bézier surface patch
    * Input: $4\times 4$ control points
    * Output is 2D surface parameterized by $(u, v)$ in $[0, 1]^2$    i
    * Method: separable 1D de Casteljau Algorithm
      * Use de Casteljau to evaluate point $u$ on each of the 4 Bézier curves in $u$. This gives 4 control points for the "moving" Bézier curve
      * Use 1D de Casteljau to evaluate point $v$ on the "moving" curve

### Mesh operations: Geometry processing

* Mesh subdivision
  * Upsampling: Increase resolution
* Mesh simplification
  * Downsampling: Decrease resolution; try to preserve shape / appearance
* Mesh regularization
  * Same number of triangles: modify sample distribution to improve quality

#### Mesh subdivision algorithm

##### Loop subdivision

* Common subdivision rule for triangle meshes
* First, create more triangles (vertices)
  * Split each triangle into four
* Second, tune their positions
  * Assign new vertex positions according to weights
    * New / old vertices updated differently
  * Update
    * For new vertices: update to `3/8 * (A + B) + 1/8 * (C + D)`, where `A`, `B` are nodes on the same node as the new vertex and `C`, `D` are in the same triangle as the new vertex that is not `A`, `B`
    * For old vertices: Update to `(1 - n*u) * original_position + u * neightbor_position_sum`, where `n` is the vertex's degree, `u = 3/16` if `n = 3`, `u = 3 / (8n)` otherwise

##### Catmull-Clark subdivision (General mesh)

* Quad face: surface with # edges == 4
* Non-quad face: surface with # edges != 4
* Extraordinary vertex: vertex with degree != 4
* Each subdivision step: 
  * Add vertex in each face
  * Add midpoint on each edge
  * Connect all new vertices
* After one subdivision
  * All non-quad faces disappear while each non-quad face adds a extraordinary vertex
* Catmull-Clark vertex update rules
  * Separated into face point, edge point, vertex point

#### Mesh simplification algorithm

* Goal: reduce number of mesh elements while maintaining the overall shape

##### Collapsing an edge

* Suppose we simplify a mesh using edge collapsing

##### Quadric error metrics

* How much geometric error is introduced by simplification?
* Not a good idea to perform local averaging of vertices
* Quadric error: new vertex should minimize its sum of square distance (L2 distance) to previously related triangle planes

##### Quadric error of edge collapse

* Idea: compute edge midpoint, measure quadric error
* Iteratively collapse edges
* Which edges? Assign score with quadric error metric
  * Approximate distance to surface as sum of distances to planes containing triangles
  * Iteratively collapse edge with smallest score
  * Greedy algorithm gives great results

## 7. Ray tracing

### Why ray tracing?

* Rasterization could't handle global effects well
  * (Soft) shadows
  * And especially when the light bounces more than once
* Rasterization is fast, but quality is relatively low
* Ray tracing is accurate, but is very slow
  * Rasterization: real-time, ray tracing: offline
  * ~10K CPU core hours to render one frame in production

### Basic ray tracing algorithms

#### Light rays

Three ideas about light rays

1. Light travels in straight lines (though this is wrong)
2. Light rays do not "collide" with each other if they cross (though this is still wrong)
3. Light rays travel from the light sources to the eye (but the physics is invariant under path reversal - reciprocity)
   * "And if you gaze long into an abyss, the abyss also gazes into you"

#### Ray casting

1. Generate an image by casting one ray per pixel
2. Check for shadows by sending a ray to the light

#### Recursive (Whitted-style) ray tracing

"An improved illumination model for shaded display". Simulate how light bounces around

#### Ray-surface intersection

##### Ray equatioin

Ray is defined by its origin and a direction vector: 
$$
\vec{r}(t)=\vec{o} + t\vec{d},\quad 0\leq t< \infty
$$
Here

* $\vec{r}$: a point along the ray 
* $t$: "time"
* $\vec{o}$: origin
* $\vec{d}$: (normalized) direction

##### Ray intersection with sphere

Sphere: $\vec{p}:(\vec{p}-\vec{c})^2-R^2 = 0$

The intersection $p$ must satisfy both ray equation and sphere equation. So:
$$
(\vec{o} + t\vec{d} -\vec{c})^2-R^2=0
$$
Solving: 
$$
at^2 + bt + c = 0
$$
where
$$
a=\vec{d}\cdot{\vec{d}}
$$

$$
b=2(\vec{o}-\vec{c})\cdot{\vec{d}}
$$

$$
c=(\vec{o}-\vec{c})\cdot(\vec{o}-\vec{c}) - R^2
$$

$$
t=\frac{-b\pm\sqrt{b^2 - 4ac}}{2a}
$$

##### Ray intersection with implicit surface

General implicit surface: $\vec{p}: f(\vec{p})=0$

Substitute ray equation: $f(\vec{o}+t\vec{d})=0$, and solve for real, positive roots

##### Ray intersection with triangle mesh

Why triangle?

* Rendering: visibility, shadows lighting ...
* Geometry: inside / outside test

How to computer? Let's break this down:

* Simple idea: just intersect ray with each triangle
* Simple, but slow 
  * Can have 0, 1 intersections (ignoring multiple intersections)

Triangle is in a plane

* Ray-plane intersection
* Test if hit point is inside triangle

Plane equation: plane is defined by normal vector and a point on plane
$$
\vec{p}: (\vec{p}-\vec{p}')\cdot \vec{N} = 0
$$
Then we can solve for intersection:

Set $\vec{p}=\vec{r}(t)$ and solve for $t$:
$$
(\vec{o} + t\vec{d} - \vec{p}'')\cdot\vec{N} = 0
$$

$$
t = \frac{\vec{p}'-\vec{o}\cdot\vec{N}}{\vec{d}\cdot\vec{N}}
$$

Check: $0\leq t<\infty$​

##### Möller Trumbore algorithm

A faster approach, giving barycentric coordinate directly
$$
\vec{O} + t\vec{D} = (1-b_1-b_2) \vec{P}_0 + b_1\vec{P}_1 + b_2 \vec{P}_2
$$
$(1-b_1-b_2), b_1, b_2$ are barycentric coordinates and we solve for $t, b_1, b_2$

#### Accelerating ray-surface intersection

##### Ray tracing - performance challenges

Simple ray-scene intersection

* Exhaustively test ray-intersection with every object
* Find the closest hit (with minimum $t$)

Problem:

* Naive algorithm = #pixles $\times$ #objects $\times$ #bounces
* Very slow

##### Bounding volumes

Quick way to avoid intersections: bound complex object with a simple volume

* Object is fully contained in the volume
* If it doesn't hit the volume, it doesn't hit the object
* So test the bounding volumes first, then test the objects

##### Ray-intersection with box

Box is the intersection of 3 pairs of slabs. Specifically, we often use an axis-aligned bounding box (AABB), i.e. any side of the bounding box is along either x, y, or z axis

##### Ray intersection with axis-aligned box

2D example (3D is the same): Compute intersections with slabs and take intersection of $t_\text{min}/t_\text{max}$ intervals

* A box (3D) = three pairs of infinityly large slabs
* Key ideas
  * The ray enters the box only when it enters all pairs of slabs
  * The ray exits the box as long as it exits any pair of slabs
* For each pair, calculate the $t_\text{min}$ and $t_\text{max}$ (negative is fine)
* Fox the 3D, $t_\text{enter}=\max(t_\text{min}), t_\text{exit}=\min(t_\text{max})$
* If $t_\text{enter} < t_\text{exit}$, we known that the ray stays a while in the box so they must intersect
* However, ray is not a line
  * Should check whether $t$ is negative for physical correctness
* What if $t_\text{exit}<0$?
  * The box is "behind" they ray - no intersection
* What if $t_\text{exit} >=0$ and $t_\text{enter}<0$?
  * Then the ray's origin is inside the box - have intersection
* In summary, ray and AABB intersect iff
  * $t_\text{enter} < t_\text{exit}$ and $t_\text{exit} \geq 0$


##### Why axis-aligned?
For the general surface, the computation is complex. But, for example, for slabs perpendicular to x-axis, we have: 
$$
t=\frac{\vec{p}'_x - \vec{o}_x}{\vec{d}_x}
$$

### Uniform spatial partitions (Grids)

* Preprocess - build acceleration grid
  1. Find bounding box
  2. Create grid
  3. Store each object in overlapping cells

* Ray-scene intersection
  * Step through grid in ray traversal order
  * For each grid cell: 
    * Test intersection with all objects stored at that cell
* Grid resolution?
  * One cell: no speedup
  * Too many cells: Inefficiency due to extraneous grid traversal
  * Heuristic: 
    * Number of cells = C * number of objects
    * C $\approx$ 27 in 3D



### Spatial partitions

#### KD-Tree pre-processing
##### Data structure for KD-Trees

* Internal nodes store 
  * Split axis: x-, y-, or z- axis
  * Split position: coordinate of split plane along axis
  * Children: pointers to child nodes
  * No objects are stored in internal nodes, only in leaves
* Leaf nodes store
  * List of objects



##### Traversing a KD-Tree

Going throw the tree and check if the ray intersect each internal nodes. If it does, goes down in the tree. If it is a leaf node, check if the ray intersect with all of the objects in the leaf node



#### Object partition & Bounding Volume Hierarchy (BVH)

##### Building BVH

How to subdivide a node?

* Choose a dimension to split
* Heuristic #1: Always chose the longest axis in node
* Heuristic #2: Split node at location of median object





##### Data structure for BVHs

Internal node store

* Bounding box
* Children: pointers to child nodes

Leaf nodes store

* Bounding box
* List of objects

Nodes represent subset of primitives in scene

* All objects in subtree



##### Pseudo code

````pseudocode
Intersect(Ray ray, BVH node) {
    if (ray misses node.bbox) return;
    if (node is a leaf node) 
        test intersection with all objs;
    	return closest intersection;
    
    hit1 = Intersect (ray, node.child1);
    hit2 = Intersect (ray, node.child2);
    
    return the closer of hit1, hit2;
}
````



### Spatial vs Object partitions

Spatial partition (e.g. KD-tree)

* Partition space into non-overlapping regions
* An object can be contained in multiple regions

Object partition (e.g. BVH)

* Partition set of objects into disjoint subsets
* Bounding boxes for each set may overlap in space



## 8. Basic radiometry

### Motivation why we study radiometry

Observation

* In Blinn-Phong model, we might use for example the light intensity $I=10$. But what is it? What is the unit?
* Do you think Whitted style ray tracing gives correct results?
* All the answers can be found in radiometry



### Radiometry

Measurement system and units for illumination

Accurately measure the spatial properties of light

* New terms: Radiant flux, intensity, irradiance, radiance

Perform lighting calculations in a physically correct manner



### Radiant energy and flux (power)

Def: Radiant energy is the energy of electromagnetic radiation. It is measured in units of joules, and denoted by the symbol:
$$
Q\quad [J=Joule]
$$
Def: Radiant flux (power) is the energy emitted, reflected, transmitted or received, per unit time
$$
\Phi\equiv \dv{Q}{t}\quad [W=Watt][lm =lumen]
$$
Flux can also be considered as #photons flowing through a sensor in unit time



### Important light measurements of interest

* Light emitted from a source: Radiant intensity
* Light falling on a surface: Irradiance
* Light traveling along a ray: Radiance



### Radiant intensity

Def: The radiant (luminous) intensity is the power per unit solid angle emitted by a point light source
$$
I(\omega)\equiv \dv{\Phi}{\omega}\quad\left[\frac{W}{sr}\right]\left[\frac{lm}{sr}=cd=candela\right]
$$


#### Angles and solid angles

Angle: Ratio of subtended arc length on circle to radius. Circle has $2\pi$ radians

Solid angle: Ratio of subtended area on sphere to radius squared. Sphere has $4\pi$ steradians

Differential solid angles: 
$$
\,dA = (r\,d\theta)(r\sin\theta \,d\phi) = r^2 \sin\theta \,d\theta \,d\phi
$$

$$
d\omega=\frac{dA}{r^2}=\sin\theta \,d\theta \,d\phi
$$

Sphere: $S^2$
$$
\begin{aligned}
\Omega &= \int_{S^2}d\omega \\&= \int_0^{2\pi} \int_0^\pi \sin\theta \,d\theta \,d\phi\\ &= 4\pi
\end{aligned}
$$


#### Isotropic point source

$$
\Phi = \int_{S^2} Id\omega = 4\pi I
$$

$$
I = \frac{\Phi}{4\pi}
$$

### Irradiance

Def: The irradiance is the power per (perpendicular / projected) unit area incident on a surface point
$$
E(x)\equiv \dv{\Phi(x)}{A}\quad \left[\frac{W}{m^2}\right]\left[\frac{lm}{m^2}=lux\right]
$$
Lambert's cosine law: Irradiance at surface is proportional to consine of angle between light direction and surface normal which is how the Lambert's cosine law is defined

Irradiance get lower and lower the further away from the light source



### Radiance

Radiance is the fundamental field quantity that describes the distribution of light in an environment

* Radiance is the quantity associated with a ray
* Rendering is all about computing radiance

Def: The radiance (luminance) is the power emitted, reflected, transmitted or received by a surface, per unit solid angle, per projected unit area
$$
L(o,\omega)\equiv \pdv[2]{\Phi(p,\omega)}{\omega}{A \cos\theta}\quad \left[\frac{W}{sr\ m^2}\right]\left[\frac{cd}{m^2}=\frac{lm}{sr\ m^2} = nit\right]
$$
Here $\cos\theta$ accounts for projected surface area

Recall: 

* Irradiance: power per projected unit area
* Intensity: power per solid angle

So:

* Radiance: Irradiance per solid angle
* Radiance: Intensity per projected unit area



#### Incident radiance

Incident radiance is the irradiance per unit solid angle arriving at the surface, i.e. it is the light arriving at the surface along a given ray (point on surface and incident direction)



#### Exiting radiance

Exiting surface radiance is the intensity per unit projected area leaving the surface, e.g. for an area light it is the light emitted along a given ray (point on surface and exit direction)



### Irradiance vs. Radiance

* Irradiance: total power received by area $dA$
* Radiance: power received by area $dA$ from "direction" $d\omega$

$$
dE(p,\omega) = L_i(p,\omega)\cos\theta\,d\omega
$$


$$
E(p) = \int_{H^2} L_i (p,\omega) \cos\theta \,d\omega
$$
Here $H^2$ is the unit hemisphere



### Bidirectional Reflectance Distribution Function (BRDF)

#### Reflection at a point

Radiance from direction $\omega_i$ turns into the power $E$ that $dA$ receives. Then power $E$ will become the radiance to any other direction $\omega_o$

Differential irradiance incoming: $\,dE(\omega_i) = L(\omega_i)\cos\theta_i \,d\omega_i$ 

Differential radiance exiting (due to $dE(\omega_i)$): $dL_r(\omega_r)$



#### BRDF

The BRDF represents how much light is reflected into each outgoing direction $\omega_r$ from each incoming directioin
$$
f_r(\omega_i\rightarrow \omega_r)=\dv{L_r(\omega_r)}{E_i(\omega_i)}=\frac{dL_r(\omega_r)}{L_i(\omega_i)\cos\theta_i\,d\omega_i}\quad\left[\frac{1}{sr}\right]
$$


#### The reflection equation

$$
L_r(p,\omega_r) =\int_{H^2} f_r(p, \omega_i\rightarrow \omega_r) L_i(p,\omega_i) \cos\theta_i \,d\omega_i
$$

##### Challenge: recursive equation

* Reflected radiance depends on incoming radiance
* But incoming radiance depends on reflected radiance (at another point in the scene)



#### The rendering equation

Re-write the reflection equation by adding an emission term to it general in case if the object is itself a light source 
$$
L_o(p,\omega_o) = L_e(p, \omega_o) + \int_{\Omega^+} L_i(p,\omega_i) f_r(p, \omega_i, \omega_o) (n\cdot \omega_i)\,d\omega_i
$$
Rendering equation as integral equation is a Fredholm Integral Equation of second kind with canonical form
$$
l(u) = e(u) + \int l(v) K(u,v) dv
$$
Or a linear operator equation:
$$
L=E+KL
$$

##### Ray tracing and extensions

* General class numerical Monte Carlo methods

* Approximate set of all paths of light in scene
  $$
  \begin{aligned}
  L &= E +KL \\
  (I-K) L &= E \\
  L &= (I-K)^{-1}E
  \end{aligned}
  $$
  With Binomial theorem:
  $$
  L = E + KE + K^2 E + K^3 E + \dots
  $$
  Here:

  * $E$: Emission directly from light sources
  * $KE$: Direct illumination on surfaces
  * $K^2E$: Indirect illumination (one bounce indirect)
  * $K^3E$: Indirect illumination (two bounce indirect)
  * $\dots$

  Shading in rasterization consider only $E + KE$



### Monte Carlo path tracing

#### Monte Carlo Integration

We want to solve an integral, but it can be too difficult to solve analytically. 
$$
\int_a^b f(x)dx
$$
Let's define the Monte Carlo estimator for the definite integral of given function $f(x)$

* Random variable: 
  $$
  X_i\sim p(x)
  $$

* Monte Carlo estimator: 
  $$
  F_N=\frac{1}{N}\sum_{i=1}^N\frac{f(X_i)}{p(X_i)}
  $$

* 

For example, uniform random variable: $p(x)=\frac{1}{b-a}$, then:
$$
F_N=\frac{b-a}{N}\sum_{i=1}^{N} f(X_i)
$$
Some notes:

* The more sample, the less variance
* Sample on $x$, integrate on $x$ 



#### Path tracing

Path tracing can be almost 100% correct, a.k.a PHOTO-REALISTIC



##### Whitted-style ray tracing

* Always perform specular reflections / refractions
* Stop bouncing at diffuse surfaces

* These simplifications are not always reasonable
  * But the rendering equation is correct
  * However it involves:
    * Solving an integral over the hemisphere
    * Recursive execution



##### A simple Monte Carlo solution

Suppose we want to render one pixel (point) for direct illumination only. The the rendering equation is just an integration over directions. So we can solve it using Monte Carlo integration. 

* What's our $f(x)$? 
  $$
  L_i(p,\omega_i) f_r(p,\omega_i, \omega_o) (n\cdot \omega_i)
  $$

* What's our pdf? 
  $$
  p(\omega_i) =1/2\pi
  $$
  Assume uniformly sampling the hemisphere. 

* Which gives: 
  $$
  L_o(p,\omega_o) \approx \frac{1}{N} \sum_{i = 1}^N \frac{L_i(p,\omega_i)f_r(p,\omega_i, \omega_o)(n\cdot \omega_i)}{p(\omega_i)}
  $$
  Which can be written in pseudo code:

  ```pseudocode
  share(p, wo)
  	Randomly choose N directions wi ~ pdf
  	Lo = 0.0
  	For each wi
  		Trace a ray r(p, wi)
  		If ray r hit the light
  			Lo += (1/N) * L_i * f_r * cosine / pdf(wi)
  	return Lo
  ```

  

##### Introducing global illumination

One more step forward: What if a ray hits an object? It is also a light source then. Which will change the previous code to:

```pseudocode
share(p, wo)
	Randomly choose N directions wi ~ pdf
	Lo = 0.0
	For each wi
		Trace a ray r(p, wi)
		If ray r hit the light
			Lo += (1 / N) * L_i * f_r * cosine / pdf(wi)
		Else If ray r hit an object at q
			Lo += (1 / N) * shade(q, -wi) * f_r * cosine / pdf(wi)
	Return Lo
```



#### Problems with this kind of path tracing

1. Explosion of number of rays as number of bounces go up

   * Solution: Only 1 ray is traced at each shading point. This is then called Path tracing. 
   * If $N \ne 1$, then it is distributed ray tracing

   * Ray generation:

     ```pseudocode
     ray_generation(camPos, pixel)
     	Uniformly choose N sample positions within the pixel
     	pixel_radiance = 0.0
     	For each sample in the pixel
     		Shoot a ray r(camPos, cam_to_sample)
     		If ray r hit the scene at p
     			pixel_radiance += 1 / N * shade(p, sample_to_cam)
     	Return pixel_radiance

2. The recursive algorithm will never stop

   * Solution: Russian Roulette (RR)

   * Russian Roulette is all about probability. 

     * With probability $0<P<1$, you are fine
     * With probability $1-P$, otherwise

   * Previously, we always shoot a ray at a shading point and get the shading result $L_o$

   * Suppose we manually set a probability $P$, shoot a ray and return the shading result divided by $P$: $L_o/P$

   * With probability $1-P$, don't shoot a ray and you will get 0

   * In this way, you can still get a expect value of $Lo$: 
     $$
     E = P \times (L_o/P)  + (1-P)\times 0  = L_o
     $$

   * Which gives the following pseudo code:

     ```pseudocode
     shade(p, wo)
     	Manually specify a probability P_RR
     	Randomly select ksi in a uniform dist. in [0, 1]
     	If (ksi > P_RR) return 0.0
     	
     	Randomly choose One direction wi~pdf(w)
     	Trace a ray r(p, wi)
     	If ray r hit the light
     		Return L_i * f_r * cosine / pdf(wi) / P_RR
         Else If ray r hit an object at q
         	Return shade(q, -wi) * f_r * cosine / pdf(wi) / P_RR
     ```

   * Now, the path tracing is correct

3. However, still not really efficient

   * Understanding the reason of being inefficient: There will be 1 ray hitting the light. So a lot of rays are "wasted" if we uniformly sample the hemisphere at the shading point

   * Sampling the light

     * Monte Carlo methods allows any sampling methods, so we can sample the light (therefore no rays are "wasted")

     * Assume uniformly sampling on the light: 
       $$
       \text{pdf} = 1 / A
       $$
       Because 
       $$
       \int \text{pdf}\, dA= 1
       $$
       But the rendering equation integrates on the solid angle: 
       $$
       L_o = \int L_i f_r\cos \,d\omega
       $$

     * Recall: for Monte Carlo integration, sample on $x$ then integration on $x$:

       * Need to make the rendering equation as an integral of $dA$. Need the relationship between $d\omega$ and $dA$. 

       * Projected area on the unit sphere:
         $$
         d\omega = \frac{dA \cos\theta'}{||x'-x||^2}
         $$
         Here $\theta'$ is the angle between the normal of the light and the vector from $x'$ to $x$ 

     * Then the rendering equation become: 
       $$
       L_o(x, \omega_o) = \int_A L_i (x, \omega_i) f_r (x, \omega_i, \omega_o)\frac{\cos\theta \cos\theta'}{||x'-x||^2} dA
       $$
       Which gives the pseudo code: 

       ````pseudocode
       shade(p, wo)
       	# Contribution from the light source
       	L_dir = 0.0
       	Uniformly sample the light at xp (pdf_light = 1 / A)
       	Shoot a ray from p to xp
       	If the ray is not blocked in the middle
       		L_dir = L_i * f_r * cos theta * cos thetap / |xp - p|^2 / pdf_light
       	
       	# Contribution from other reflectors
       	L_indir = 0.0
       	Test Russian Roulete with probability P_RR
       	Uniformly sample the hemisphere toward wi (pdf_hemi = 1 / 2pi)
       	Trace a ray r(p, wi)
       	If ray r hit a non-emitting object at q
       		L_indir = shade(q, -wi) * f_r * cos theta / pdf_hemi / P_RR
           
           Return L_dir + L_indir
       ````

       Now, Path tracing is finally done

     

   

## 9. Materials and Appearances

### What is material in computer graphics? 

* Material == BRDF



#### Diffuse / Lambertian material:

Light is equally reflected in each output direction. Suppose the incident lighting is uniform:
$$
\begin{aligned}
L_o (\omega_o) &= \int_{H^2} f_r L_i(\omega_i) \cos \theta_i \,d\omega_i \\
&= \pi f_r L_i
\end{aligned}
$$
Which gives albedo (color): 
$$
f_r = \frac{\rho}{\pi}
$$


#### Some materials

* Glossy material (BRDF)

* Ideal reflective / refractive material (BSDF)
* Isotropic / Anisotropic materials (BRDFs)
  * Key: directionality of underlying surface
  * Anisotropic BRDF: Brushed metal



#### Fresnel reflection / term

Reflectance depends on incident angle (and polarization of light). This terms differs from different material. There is a very complex formulate. To make it accurate, you need to consider polarization. 

Schlick's approximation:
$$
R(\theta) = R_0 + (1 - R_0)(1-\cos\theta)^5
$$
Here 
$$
R_0 = \left(\frac{n_1-n_2}{n_1 + n_2}\right)^2
$$


### Microfacet Material 

#### Microfacet theory

##### Rough surface

* Macroscale: flat & rough
* Microscale: bumpy & specular



##### Microfacet BRDF

* Key: the distribution of microfacets' normals
  * Concentrated <=> Glossy
  * Spread <=> Diffuse

* What kind of microfacet reflect $\omega_i$ to $\omega_o$?
  $$
  f(i, o) = \frac{F(i,h)G(i,o,h)D(h)}{4 (n,i)(n,o)}
  $$
  Here

  * $h$: half vector
  * $F$: Fresnel term
  * $G$: Shadowing masking term
  * $D$: Distribution of normals



### Isotropic / Anisotropic materials (BRDFs)

* Key: directionality of underlying surface
* Anisotropic BRDF: For example, brushed metal



#### Properties of BRDFs

* Non-negativity
  $$
  f_r(\omega_i \rightarrow \omega_r) \geq 0
  $$

* Linearity
  $$
  L_r (p, \omega_r) = \int_{H^2} f_r(p, \omega_i\rightarrow \omega_r) L_i (p,\omega_i) \cos\theta_i\,d\omega_i
  $$
  
* Reciprocity principle
  $$
  f_r(\omega_r \rightarrow \omega_i) = f_r(\omega_i\rightarrow \omega_r)
  $$
  
* Energy conservation
  $$
  \forall\omega_r\,\quad\int_{H^2} f_r(\omega_i\rightarrow \omega_r)\cos\theta_i\,d\omega_i \leq1
  $$

* Isotropic vs. anisotropic
  * If isotropic,
    $$
    f_r(\theta_i, \phi_i; \theta_r, \phi_r) = f_r(\theta_i, \theta_r, \phi_r - \phi_i)
    $$

  * Then, from reciprocity:

  $$
  f_r(\theta_i, \theta_r, \phi_r - \phi_i) = f_r(\theta_i, \theta_r, \phi_i - \phi_r)=f_r(\theta_i, \theta_r, |\phi_r - \phi_i|)
  $$



### Measuring BRDFs

#### Motivation

Avoid need to develop / derive models

* Automatically includes all of the scattering effects present

Can accurately render with real-world materials

* Useful for product design, special effects, ...

Theory and practical do not align



#### Image-based BRDF measurement

Goniorefectometer, also called spherical gantry at UCSD. General approach: 

```pseudocode
foreach outgoing direction wo
	move light to illuminate surface with a thin beam from wo
	foreach incoming direction wi
		move sensor to be at direction wi from surface
		measure incident radiance
```



##### Improving efficiency

* Isotropic surfaces reduce dimensionality from 4D to 3D
* Reciprocity reduces number of measurements by half
* Clever optical systems...



#### Challenges in measuring BRDFs

* Accurate measurements at grazing angles
  * Important due to Fresnel effects
* Measuring with dense enough sampling to capture high frequency specularities
* Retro-reflection
* Spatially-varying reflectance, ...



#### Representing measured BRDFs

Desirable qualities 

* Compact representation
* Accurate representation of measured data
* Efficient evaluation for arbitrary pairs of directions
* Good distributions available for importance sampling



## 10. Advanced topics in rendering

### Biased vs. unbiased Monte Carlo estimators

* An unbiased Monte Carlo technique does not have any systematic error
  * The expected value of an unbiased estimator will always be the correct value, no matter how many samples are used
* Otherwise, biased
  * One special case, the expected value converges to the correct value as infinite number of samples are used -> consistent
  * Biased == blurry
  * Consistent == not blurry with infinite number of samples



### Bidirectional path tracing (BDPT)

* Recall: a path connects the camera and the light
* BDPT
  * Traces sub-paths from both the camera and the light
  * Connects the end points from both sub-paths
* Suitable if the light transport is complex on the light's side
* Unbiased
* Difficult to implement & quite slow



### Metropolis light transport (MLT)

* A Markov chain Monte Carlo (MCMC) application
  * Jumping from the current sample to the next with some PDF
* Works great with difficult light paths
* Unbiased
* Difficult to estimate the convergence rate
* Does not guarantee equal convergence rate per pixel
* So, usually produces "dirty" results
* Therefore, usually not used to render animations



### Photon mapping

* A biased approach & a two-stage method 
* Very good at handling Specular-Diffuse-Specular (SDS) paths and generating caustics
* Approach (variations apply)
  * Stage 1 - photon tracing
    * Emitting photons from the light source, bouncing them around, then recording photons on diffuse surfaces
  * Stage 2 - photon collection (final gathering)
    * Shoot sub-paths from the camera, bouncing them around, until they hit diffuse surfaces
* Calculation - local density estimation
  * Idea: areas with more photons should be brighter
  * For each shading point, find the nearest $N$ photons. Take the surface area they over
    * Small $N$ -> noisy
    * Large $N$ -> blurry

* Why biased?

  * Local density estimation: $dN/dA\,\ne \Delta N/\Delta A$

  * But in the sense of limit
    * More photons emitted -> the same $N$ photons covers a smaller $\Delta A$ -> $\Delta A$ is closer to $dA$



### Vertex connect and merging

* A combination of BDPT and photon mapping 
* Key idea
  * Let's not waste the sub-paths in BDPT if their end points cannot be connected but can be merged
  * Use photon mapping to handle the merging of nearby "photons"



### Instant radiosity (IR)

* Sometimes also called many-light approaches
* Key idea
  * Lit surface can be treated as light sources
* Approach 
  * Shoot light sub-paths and assume the end point of each sub-path is a Virtual Point Light (VPL)
  * Render the scene as usual using these VPLs
* Pros: fast and usually gives good results on diffuse scenes
* Cons:
  * Spikes will emerge when VPLs are close to shading points
  * Cannot handle glossy materials





### Advanced appearance modeling

* Non-surface models
  * Participating media
  * Hair / fur / fiber (BCSFD)
  * Granular material
* Surface models
  * Translucent material (BSSRDF)
  * Cloth
  * Detailed material (non-statistical BRDF)
* Procedural appearance



#### Non-surface models

##### Participating media: cloud / mist

* At any point as light travels through a participating medium, it can be (partially) absorbed and scattered
* Use phase function to describe the angular distribution of light scattering at any point $x$ within participating media

* Rendering
  * Randomly choose a direction to bounce
  * Randomly choose a distance to go straight
  * At each "shading point", connect to the light



##### Hair appearance

Marschner model

* Glass-like cylinder
* 3 types of light interactions: $R$, $TT$, $TRT$, here:
  * Reflection: $R$
  * Transmission: $T$

* Human hair vs animal fur
  * Cortex
    * Contains pigments
    * Absorbs light
  * Medulla 
    * Complex structure
    * Scatters light
    * Animal fur has a much larger medulla than human hair
  * Cuticle
    * Covered with scales



##### Granular material

* Lots of small particles
* Can we avoid explicit modeling of all granules?
  * Yes, with procedural definition



#### Surface models

##### Translucent material: i.e. jade

* Subsurface scattering

  * Visual characteristics of many surfaces caused by light existing at different points than it enters
  * Violates a fundamental assumption of BRDF

* Scattering functions

  * BSSRDF

    * Generalization of BRDF

    * Exitant radiance at one point due to incident differential irradiance at another point
      $$
      S(x_i, w_i, x_o, w_o)
      $$

  * Generalization of rendering equation

    * Integrating over all points on the surface and all directions 
      $$
      L(x_o, w_o) = \int_A\int_{H^2} S(x_i, w_i, x_o, w_o) L_i (x_i, w_i) \cos\theta_i \,d\omega_i\,dA
      $$

* Dipole approximation

  * Approximate light diffusion by introducing two point sources



##### Cloth

* A collection of twisted fibers
* Two levels of twist
  * Cloth includes several cloth
  * Yarn includes several ply
  * Ply includes several fibers
* Render as surface
  * Given the weaving pattern, calculate the overall behavior
  * CameRender using BRDF
* Render as participating media
  * Properties of individual fibers and their distribution -> scattering parameters
  * Render as a participating medium
* Render as actual fibers
  * Render every fiber explicitly
  * Too complex



##### Detailed appearance

* Not looking realistic: Looking too perfect. Real world is more complex

* Add detailed 

* Wave optics

  

#### Procedural appearance

* Can we define details without textures?
  * Yes, compute a noise function on the fly
  * 3D noise -> Internal structure if cut or broken
  * Thresholding (noise -> binary noise)



## 11. Cameras, Lenses and Light Fields

### Camera

#### What's happening inside the camera?

* Pinholes & lenses form image on sensor
* Shutter exposes sensor for precise duration
* Sensor accumulates irradiance during exposure 



#### Why not sensors without lenses?

Each sensor point would integrate light from all points on the object, so all pixel values would be similar, i.e. the sensor records irradiance



### Field of view (FOV)

For a fixed sensor size, decreasing the focal length increases the field of view
$$
FOV = 2\arctan (\frac{h}{2f})
$$

#### Focal length v. Field of view

* For historical reasons, it is common to refer to angular field of view by focal length of a lens used on a 35mm-format film (36x24 mm)
* Examples of focal lengths on 35mm format
  * 17mm is wide angle $104\degree$
  * 50mm is a "normal" lens $47\degree$
  * 200mm is telephoto lens $12\degree$
* Careful! When we say current cell phones have approximately 28mm "equivalent" focal length, this uses the above convention



### Sensor sizes

#### Maintain FOV on smaller sensor?

To maintain FOV, decrease focal length of lens in proportion to width / height of sensor



### Exposure

* $H = T\times E$
* Exposure = time $\times$ irradiance
* Exposure time ($T$)
  * Controlled by shutter
* Irradiance ($E$)
  * Power of light falling on a unit area of sensor
  * Controlled by lens aperture and focal length



#### Exposure controls in photography

Aperture size

* Change the f-stop by opening / closing the aperture (if camera has iris control)
* F-number (F-stop): Exposure level
  * Written as FN or F/N. N is the f-number
  * Informal understanding: the inverse-diameter of a round aperture
  * Formal: the f-number of a lens is defined as the focal length divided by the diameter of the aperture

Shutter speed

* Change the duration the sensor pixels integrate light
* Side effect of shutter speed
  * Motion blur: handshake, subject movement
  * Doubling shutter time doubles motion blur
    * Motion blur is not always bad
  * Rolling shutter: different parts of photo taken at different times

ISO gain

* Change the amplification (analog and/or digital) between sensor values and digital image values
* Film: trade sensitivity for grain
* Digital: trade sensitivity for noise
  * Multiply signal before analog-to-digital conversion
  * Linear effect (ISO 200 needs half the light as ISO 100)



##### Constant exposure: F-stop vs. Shutter speed

If the exposure is too bright/dark, may need to adjust f-stop and / or shutter up / down

* Photographers must trade off depth of field and motion blur for moving subjects





### Thin lens approximation

Real lens designs are highly complex



#### Ideal thin lens - focal point

1. All parallel rays entering a lens pass through its focal point
2. All rays through a focal point will be in parallel after passing the lens
3. Focal length can be arbitrarily changed (in reality, yes with several lenses)



#### The thin lens equation

$$
\frac{1}{f} = \frac{1}{z_i} + \frac{1}{z_o}
$$



#### Ray tracing ideal thin lenses

##### Ray tracing for defocus blur

(One possible) setup:

* Choose sensor size, lens focal length and aperture size

* Choose depth of subject of interest $z_0$ z

Rendering: 

* For each pixel $x'$ on the sensor (actually, film)
* Sample random points $x''$ on lens plane
* You know the ray passing through the lens will $x'''$ (using the thin lens formula)



### Depth of field

Set circle of confusion as the maximum permissible blur spot on the image plane that will pear sharp under final viewing conditions



#### Circle of confusion for depth of field

I.e. depth range in a scene where the corresponding CoC is considered small enough



### Light field / lumigraph

#### The Plenoptic function 

$$
P(\theta, \phi)
$$

is intensity of light

* Seen from a single view point
* At a single time
* Averaged over the wavelengths of the visible spectrum

Improved version
$$
P(\theta, \phi, \lambda, t, V_x, V_y, V_z)
$$
is intensity of light

* Seen from ANY viewpoint
* Over time
* As a function of wavelength
* This is the holographic movie
* Can reconstruct every possible view, at every moment, from every position, at every wavelength
* Contains every photograph, every movie, everything that anyone has ever seen. It completely captures our visual reality



#### Only plenoptic surface

The surface of a cube holds all the radiance information due to the enclosed object







## 12. Color and Perception

### Physical basis of color

#### The fundamental components of light

* Newton showed sunlight can be subdivided into a rainbow with a prism
* Resulting light cannot be further subdivided with a second prism



#### Spectral power distribution (SPD)

Salient property in measuring light

* The amount of light present at each wavelength
* Units:
  * Radiometric units / nanometer (e.g. watts / nm)
  * Can also be unit-less
* Often use "relative units" scaled to maximum wavelength for comparison across wavelengths when absolute units are not important



#### What is color?

* Color is a phenomenon of human perception, it is not a universal property of light
* Different wavelengths of light are not "colors"



### Biological basis of color

#### Retinal photoreceptor cells: Rods and Cones

Rods are primary receptors in very low light ("scotopic" conditions), e.g. dim moonlight

* ~ 120 million rods in eye
* Perceive only shades of grey, no color

Cones are primary receptors in typical light levels ("photopic")

* ~ 6-7 million cones in eye
* Three types of cones, each with different spectral sensitivity
* Provide sensation of color



#### Spectral response of human cone cells

* Three types of cone cells: S, M, and L (corresponding to peak response at short, medium, and long wavelengths)

* Fraction of three cone cell types varies widely
  * Distribution of cone cells at edge of fovea in 12 different humans with normal color vision. High variability of percentage of different cone types

* Now we have three detectors (S, M, L cones cells)
  $$
  \begin{aligned}
  S=\int r_S(\lambda) s(\lambda)\, d\lambda \\
  M=\int r_M(\lambda) s(\lambda)\, d\lambda \\
  L=\int r_L(\lambda) s(\lambda)\, d\lambda \\
  \end{aligned}
  $$



#### The human visual system

* Human eye does not measure and brain does not receive information about each wavelength of light
* Rather, the eye "sees" only three response values (S, M, L), and this is only info available to brain



#### Metamers

Metamers are two different spectra ($\infty$-dim) that project to the same (S, M, L) (3-dim) response

* These will appear to have the same color to a human 

The existence of metamers is critical to color reproduction

* Don't have to reproduce the full spectrum of a real world scene
* Example: A metamer can reproduce the perceived color of a real-world scene on a display with pixels of only three color

This is the theory behind color matching



### Color reproduction / Matching

#### Additive color

* Given a set of primary lights, each with its own spectral distribution (e.g. RGB display pixels)
  $$
  s_R(\lambda), s_G(\lambda), s_B(\lambda)
  $$

* Adjust the brightness of these lights and add them together
  $$
  R_{s_R}(\lambda) + R_{s_G}(\lambda) + R_{s_B}(\lambda) 
  $$
  
* The color is now described by the scalar values:
  $$
  R, G, B
  $$



#### CIE RGB color matching experiment

* Same setup as additive color matching before, but primaries are monochromatic light (single wavelength): 700nm, 546.1nm, 435.8nm
* Graph plots how much of each CIE RGB primary light must be combined to match a monochromatic light of wavelength given on x-axis
* For any spectrum $s$, the perceived color is matched by the convolution of the spectrum and the CIE RGB color match graph



### Color spaces

#### Standard color spaces (sRGB)

* Makes a particular monitor RGB standard
* Other color devices simulate that monitor by calibration
* Widely adopted today
* Gamut is limited



#### A universal color space: CIE XYZ

Imaginary set of standard color primaries X, Y, Z

* Primary colors with these matching functions do not exist
* Y is luminance (brightness regardless of color)

Designed such that

* Matching functions are strictly positive
* Span all observable colors

Separating luminance, Chromaticity

* Luminance: Y

* Chromaticity: x, y, z, define as
  $$
  \begin{aligned}
  x = \frac{X}{X+Y+Z} \\
  y = \frac{Y}{X+Y+Z} \\
  z = \frac{Z}{X+Y+Z} \\
  \end{aligned}
  $$
  
* Since $x+y+z = 1$, we only need to record two of the three

  * Usually choose $x$ and $y$, leading to $(x,y)$ coordinates at a specific brightness $Y$

* The curved boundary
  * Named spectral locus
  * Corresponds to monochromatic light (each point representing a pure color of a single point)



#### Gamut

Different color space gives a different gamut. 



### Perceptually organized color spaces

#### HSV color space (Hue-Saturation-Value)

* Axes correspond to artistic characteristics of color

* idely used in a "color picker"

* Hue
  * the "kind" of color, regardless of attributes
  * colorimetric correlate: dominant wavelength
  * artist's correlate: the chosen pigment color
* Saturation 
  * the "colorfulness"
  * colorimetric correlate: purity
  * artist's correlate: fraction of paint from the colored tube
* Lightness (or value)
  * the overall amount of light
  * colorimetric correlate: luminance
  * artist's correlate: tints are lighter, shades are darker



#### CIELAB space (aka. L\* a\* b\*)

A commonly used color space that strives for perceptual uniformity

* L* is lightness (brightness)
* a* and b* are color-opponent pairs
  * a* is red-green
  * b* is blue-yellow
* Opponent color theory
  * There is a good neurological basis for the color space dimensions in CIE LAB
    * The brain seems to encode color early on using three axes:
      * White - black, red - green, yellow - blue
    * The white - black axis is lightness, the others determine hue and saturation
  * One pieces of evidence: you have a light green, a dark green, a yellow green, or a blue green, you can't find a red-green



#### CMYK: A subtractive color space

Subtractive color model

* The more you mix, the darker it will be
* Cyan, magenta, yellow, and key

Widely used in printing



## 13. Animation

### 

### Animation

"Bring things to life"

* Communication tool
* Aesthetic issues often dominate technical issues

An extension of modeling 

* Represent scene models as a function of time

Output: sequence of images that when viewed sequentially provide a sense of motion

* Film: 24 frames per second
* Video (in general): 30 fps
* Virtual reality: 90 fps



### History

* First firm
  * Originally used as scientific tool rather than for entertainment
  * Critical technology that accelerated development of animation
* First hand-drawn feature-length (>40 mins) animations: 1937
* First digital computer-generated animation: 1963
* Early computer animation: 1972
* Digital dinosaurs: 1993
* First CG feature-length film: 1995
* Computer animation becomes quite good: 2009



### Keyframe animation

* Animator (e.g. lead animator) creates keyframes
* Assistant (person or computer) creates in-between frames 



#### Keyframe interpolation

* Think of each frame as a vector of parameter values
* Keyframe interpolation of each parameter
  * Linear interpolation usually not good enough
  * Splines for smooth / controllable interpolation



### Physical simulation

#### Physical based animation

Generate motion of objects using numerical simulation



#### Mass spring system: Example of modeling a dynamic system

##### A simple idealized spring

* Force pulls points together

* Strength proportional to displacement (Hooke's law)
  $$
  \begin{aligned}
  \vec{f}_{a\rightarrow b} &= k_s(\vec{b}-\vec{a}) \\
  \vec{f}_{b\rightarrow a} &= -\vec{f}_{a\rightarrow b}
  \end{aligned}
  $$
  
* $k_s$ is a spring coefficient: stiffness



##### Non-zero length string

* Spring with non-zero rest length
  $$
  \vec{f}_{a\rightarrow b} = k_s \frac{\vec{b}-\vec{a}}{||\vec{b}-\vec{a}||} (||\vec{b}-\vec{a}|| - l)
  $$
  Here $l$ is the rest length

* Problem: infinite oscillation 



##### Introducing energy loss

* Simple motion damping: $\vec{f} = -k_d \dot{\vec{b}}$
* Behaves like viscous drag on motion
* Slows down motion in the direction of velocity
* $k_d$ is a damping coefficient
* Problem: Slows down all motion 
  * Want a rusty spring's oscillations to slow down, but should it also fall to the ground more slowly



##### Internal damping for spring

* Damp only the internal, spring-driven motion 

* Viscous drag only on change in spring length

  * Won't slow group motion for the spring system (e.g. global translation or rotation of the group)

  $$
  \vec{f}_\vec{b} = -k_d \frac{\vec{b}-\vec{a}}{||\vec{b}-\vec{a}||}\cdot(\dot{\vec{b}}-\dot{\vec{a}})\cdot \frac{\vec{b}-\vec{a}}{||\vec{b}-\vec{a}||}
  $$

  ​		Note this is only one specific type damping  



##### Structures from springs

* Behavior is determined by structure linkages

* Sheets
* Blocks 
* Others



#### Particle systems

Model dynamical systems as collections of large numbers of particles

Each particle's motion is defined by a set of physical (or non-physical) forces

Popular technique in graphics and games

* Easy to understand, implement
* Scalable: fewer particles for speed, more for higher complexity

Challenges

* May need many particles (e.g. fluids)
* May need acceleration structures (e.g. to find nearest particles for interactions)



##### Particle system animations

For each frame in animation

* [If needed] create new particles
* Calculate forces on each particle
* Update each particle's position and velocity
* [If needed] remove dead particles
* Render particles



##### Particle system forces

Attraction and repulsion forces

* Gravity, electromagnetism, ...
* Springs, propulsion, ...

Damping forces

* Friction, air drag, viscosity, ...

Collisions

* Walls, containers, fixed objects, ...
* Dynamic objects, character body parts, ...



##### Simulated flocking as an ODE

Model each bird as a particle



### Kinematics

#### Forward kinematics

Articulated skelecton

* Topology (what's connected to what)
* Geometric relations from joints
* Tree structure (in absence of loops)



Joint types

* Pin (1D rotation)
* Ball (2D rotation)
* Prismatic joint (translation)



Forward kinematics

Animation is described as angle parameter values as a function of time



#### Kinematics pros and cons

Strengths 

* Direct control is convenient
* Implementation is straightforward

Weaknesses

* Animation may be inconsistent with physics
* Time consuming for artists



#### Inverse kinematics

Direct inverse kinematics: for two-segment arm, can solve for parameters analytically

Why is the problem hard?

* Multiple solution in configuration space
* Solutions may not always exist



Numerical solution to general N-link IK problem

* Choose an initial configuration 
* Define an error metric (e.g. square of distance between goal and current position)
* Compute gradient of error as function of configuration
* Apply gradient descent (or Newton's method, or other optimization procedure)



### Rigging

Rigging is a set of higher level controls on a character that allow more rapid & intuitive modification of pose, deformations, expressions, etc.

Important

* Like strings on a puppet
* Captures all meaningful character changes
* Varies from character to character

Expensive to create

* Manual effort 
* Requires both artistic and technical training



#### Blend shapes

Instead of skeleton, interpolate directly between surfaces

E.g. model a collection of fracial expressions

Simplest scheme: take linear combination of vertex positions

Spline used to control choice of weights over time



#### Motion capture

Data-driven approach to creating animation sequences

* Record real-world performances (e.g. person executing an activity)
* Extract pose as a function of time from the data collected

Strengths

* Can capture large amounts of real data quickly
* Realism can be high

Weaknesses

* Complex and costly set-ups
* Captured animation may not meet artistic needs, requiring alterations



### Single particle simulation

#### First study motion of a single particle

To start, assume motion of particle determined by a velocity vector field that is a function of position and time: $v(x,t)$

Computing position of particle over time requires solving a first ODE: $\dv{x}{t} = \dot{x} = v(x, t)$ 

We can solve the ODE, subject to a given initial, particle position $x_0$, by using forward numerical integration 



#### Euler's method

* Simple iterative method
* Commonly used
* Very inaccurate
* Most often goes unstable

$$
\begin{aligned}
x^{t+\Delta t} = x^t + \Delta t \dot{x}^t \\
\dot{x}^{t+\Delta t} = \dot{x}^t + \Delta t \ddot{x}^t \\
\end{aligned}
$$

##### Errors of Euler method

With numerical integration, errors accumulate. Euler integration is particularly bad



##### Instability of the Euler method

* Inaccuracies increase as time step $\Delta t$ increases
* Instability is a common, serious problem that can cause simulation to diverge

* lack of stability is a fundamental problem in simulation, and cannot be ignored



#### Some methods to combat instability

Midpoint method / modified Euler

* Average velocities at start and endpoint

Adaptive step size

* Compare one step and two half-steps, recursively, until error is acceptable

Implicit methods

* Use the velocity at the next time step

Position-based / Verlet integration

* Constrain positions and velocities of particles after time step



#### Midpoint method

* Compute Euler step
* Compute derivative at midpoint of Euler step
* Update position using midpoint derivative

$$
\begin{aligned}
x_{mid} &= x(t) + \Delta t/2\cdot v(x(t), t)\\
x(t+\Delta t) &= x(t ) + \Delta t\cdot v(x_{mid}, t)
\end{aligned}
$$



#### Adaptive step size

Technique for choosing step size based on error estimate

* Very practical technique
* But may need very small steps

Repeat until error is below threshold:

* Compute $x_T$ an Euler step, size $T$
* Compute $x_{T/2}$ two Euler step, size $T/2$
* Compute error $||x_{T}-x_{T/2}||$
* If (error > threshold), reduce step size and try again



#### Implicit Euler method

Informally backward methods

Use derivatives in the future, for the current step
$$
\begin{aligned}
x^{x+\Delta t} = x^t + \Delta t\dot{x}^{t+\Delta t} \\
\dot{x}^{x+\Delta t} = \dot{x}^t + \Delta t\ddot{x}^{t+\Delta t} \\
\end{aligned}
$$
Solve nonlinear problem for $x^{t+\Delta t}$ and $\dot{x}^{t+\Delta t}$

* Use root-finding algorithm, e.g. Newton's method

Offers much better stability



#### How to determine / quantize "stability"

*  We use the local truncation error (every step) / total accumulated error (overall)
* Absolute values do not matter, but the orders w.r.t. step
* Implicit Euler has order 1, which means that
  * Local truncation error: $O(h^2)$ 
  * Global truncation error: $O(h)$ 
* Understanding of $O(h)$
  * If we halve $h$, we can expect the error to halve as well



#### Runge-Kutta Families

A family of advanced methods for solving ODEs

* Especially good at dealing with non-linearity
* Its order-four version is the most widely used, a.k.a. RK4



#### Position-based / Verlet integration

Idea

* After modified Euler forward-step, constrain positions of particles to prevent divergent, unstable behavior
* Use constrained positions to calculate velocity
* Both of these ideas will dissipate energy, stabilize

Pros / Cons

* Fast and simple
* Not physically based, dissipates energy (error)



### Rigid body simulation

Simple case

* Similar to simulating a particle

* Just consider a bit more properties
  $$
  \dv{t} \begin{bmatrix}
  X\\\theta\\\dot{X}\\\omega
  \end{bmatrix} =  \begin{bmatrix}
  \dot{X}\\\omega \\ F/M\\\Gamma/I
  \end{bmatrix}
  $$
  Here

  * $X$: positions
  * $\theta$: rotation angle
  * $\omega$: angular velocity
  * $F$: forces
  * $\Gamma$: torque
  * $I$: momentum of inertia



#### A simple position-based method

Key idea:

* Assuming water is composed of small rigid-body spheres
* Assuming the water cannot be compressed 
* So, as long as the density changes somewhere, it should be "corrected" via changing the position of particles
* You need to know the gradient of the density anywhere w.r.t. each particle's position
* Update with gradient descent



#### Eulerian vs. Lagrangian

Two different views to simulating large collections of matters

* Lagrangian approach: Follows the same particle through out its movement
* Eulerian approach: Split the space into smaller meshes, follows how each cell change over time



##### Material point method (MPM)

Hybrid, combining Eulerian and Lagrangian views

* Lagrangian: consider particles carrying material properties
* Eulerian: use a grid to do numerical integration
* Interaction: particles transfer properties to the grid, grid performs update, then interpolate back to particles







## 0. Reference
1. [GAMES 101](http://games-cn.org/intro-graphics/)

























































