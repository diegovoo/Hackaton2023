import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
import matplotlib.pyplot as plt

# Create 3D plot
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')

# Se carga el dataframe del xlsx
df = pd.read_excel('./datos_satelites_lunas.xlsx')

# Se genera una lista de tuplas separadas por las coordenadas X, Y y Z
camino_nave = list(df[['X', 'Y', 'Z']].itertuples(index=False, name=None))

# Se separan los datos en dos listas diferentes
satelites = df.loc[df['ETQ'] == 0, ['X', 'Y', 'Z']].values.tolist()
lunas = df.loc[df['ETQ'] == 1, ['X', 'Y', 'Z']].values.tolist()

# Se crean las etiquetas para cada tipo de datos
etiquetas = [0] * len(satelites) + [1] * len(lunas)

# Combine the satellite and moon data into a single list
data = satelites + lunas

# Se entrena el modelo de regresión logística
modelo = LogisticRegression().fit(data, etiquetas)
# Se predice para saber si pasa más cerca de una luna o de un satelite
predictions = modelo.predict(camino_nave)

# Se obtienen los puntos más cercanos a la luna
mejor_camino = [p for p, pred in zip(camino_nave, predictions) if pred == 1]

# Resultados del camino
x_result_vals, y_result_vals, z_result_vals = zip(*mejor_camino)

# Para graficar la solución
satelites_imprimir = df.loc[df['ETQ'] == 0]
lunas_imprimir = df.loc[df['ETQ'] == 1]

# Se separan las coordenadas en diferentes variables
satelite_x, satelite_y, satelite_z = satelites_imprimir['X'], satelites_imprimir['Y'], satelites_imprimir['Z']
luna_x, luna_y, luna_z = lunas_imprimir['X'], lunas_imprimir['Y'], lunas_imprimir['Z']


# Se crea la figura y se añaden los componentes del gráfico
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
ax.scatter(x_result_vals, y_result_vals, z_result_vals, c='red', label='result')
ax.scatter(satelite_x, satelite_y, satelite_z, c='green', label='satelites', alpha=0.3)
ax.scatter(luna_x, luna_y, luna_z, c='blue', label='moons', alpha=0.3)
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')
plt.show()

# create DataFrame with x, y, z values
df_export = pd.DataFrame({'x': x_result_vals, 'y': y_result_vals, 'z': z_result_vals})

# export DataFrame to CSV file
df_export.to_csv('output.csv', index=False)

df_export = pd.DataFrame({'x': satelite_x, 'y': satelite_y, 'z': satelite_z})

# export DataFrame to CSV file
df_export.to_csv('satelites.csv', index=False)

df_export = pd.DataFrame({'x': luna_x, 'y': luna_y, 'z': luna_z})

# export DataFrame to CSV file
df_export.to_csv('lunas.csv', index=False)

