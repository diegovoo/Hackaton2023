import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

df = pd.read_csv('./datos_control.csv')

x = df['Left'].to_list()
y = df['Top'].to_list()

# Curva polinomica que pasa por los puntos de los datos
z = np.polyfit(x, y, 3) # datos 'x', 'y', 3 por el grado
p = np.poly1d(z)

# Generar rango de puntos de la curva
curve_x = np.linspace(min(x), max(x), 100)
curve_y = p(curve_x)

plt.scatter(x, y, label='Datos')
plt.plot(curve_x, curve_y, label='trayectoria_nave')
plt.legend()
plt.show()

