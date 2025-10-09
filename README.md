# cs425-assignment3

The goal of this assignment is to get you comfortable with lighting and shading effects. Skills that you will learn include: using index buffers to load/represent geometry, computing accurate normal vectors, and calculating per-pixel lighting effects. Similar to the last assignment, you will use height map data to create a terrain mesh. You will then create shaders to implement the Phong lighting model to shade the terrain. Interactions should include the ability to pan, rotate, and zoom into the model (based on assignment 2). Additional controls should allow you to manipulate the direction/position of the light, switch between a directional and a point light source, and switch between showing the surface normals or shading the surface according to the incident light. As in the last assignment, the user should also be able to control the height of the terrain through a slider interactively. 

![Results of shading](screenshot.png)

Here is a list of tasks that you need to implement:

## Task 1

Load the mesh, this time utilizing both index and vertex buffers. The use of index buffers avoids the need to duplicate vertices that are shared by multiple triangles. This is important as we will be loading increasingly complex meshes in this assignment, as well as including additional vertex attributes (normals, specifically). 

