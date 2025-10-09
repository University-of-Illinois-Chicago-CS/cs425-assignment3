# cs425-assignment3

The goal of this assignment is to get you comfortable with lighting and shading effects. Skills that you will learn include: using index buffers to load/represent geometry, computing accurate normal vectors, and calculating per-pixel lighting effects. Similar to the last assignment, you will use height map data to create a terrain mesh. You will then create shaders to implement the Phong lighting model to shade the terrain. Interactions should include the ability to pan, rotate, and zoom into the model (based on assignment 2). Additional controls should allow you to manipulate the direction/position of the light, switch between a directional and a point light source, and switch between showing the surface normals or shading the surface according to the incident light. 

![Results of shading](screenshot.png)

Here is a list of tasks that you need to implement:

## Task 1

Load the mesh from both image  and .BSQ files. The latter is essentially a raw dump of Float32Array data (see the starter code). For uploading the mesh data to the GPU, this time you should utilize index and vertex buffers. The use of index buffers avoids the need to duplicate vertices that are shared by multiple triangles. This is important as we will be loading increasingly complex meshes in this assignment, as well as including additional vertex attributes (normals, specifically). As part of task 1, you will also implement pan, rotate, and zoom functionalities using mouse input. As in the last assignment, the user should also be able to control the height of the terrain through a slider interactively.  

## Task 2

Compute surface normals. For each triangle in the mesh, you will be computing a normal vector, and then assigning that to the corresponding vertices that make up the triangle. Note that some vertices will be shared among multiple triangles in the mesh. The normal at those shared vertices should be averaged (and normalized) to reflect the mean normal of all triangles intersecting the vertex.  Normals should be uploaded as a vertex attribute to be utilized by the shader

## Task 3

Color the mesh by surface normals: Instead of showing the XYZ coordinate in RGB color (as we did in assignment 2), you will be showing the value of the computed normal at the vertex. This will be very handy for debugging, to ensure that you are computing surface normals accurately. 


