# 📝 ToDo List App – Prueba Técnica Ionic + Angular

Aplicación móvil desarrollada como parte de una prueba técnica para la vacante de Desarrollador(a) Mobile con Ionic donde se gestionan tareas, se filtran por categorías, se puede marcar como completadas y más.

---

## 🚀 Tecnologías

- **Ionic 8 + Angular 20**
- **Capacitor 7**
- **Firebase Remote Config**
- **Storage Local (Ionic Storage)**

---

## 🔧 Funcionalidades

- ✅ Crear, editar y eliminar tareas
- ✅ Marcar tareas como completadas
- ✅ Filtrar tareas por categoría
- ✅ Agregar y eliminar categorías personalizadas
- ✅ Ocultar tareas completadas desde Remote Config (Firebase)
- ✅ Soporte multiplataforma (Android/iOS)
- ✅ Exportación a APK
- ✅ Arquitectura optimizada con lazy loading y trackBy

---

## 📦 Instalación local

```bash
git clone https://github.com/tu-usuario/toDoList.git
cd toDoList
npm install
ionic build
npx cap copy
```

---

##📲 Compilar y correr en dispositivos

Android
```bash
ionic build
npx cap copy android
npx cap open android
```
iOS (requiere Mac y Xcode)
```bash
ionic build
npx cap copy ios
npx cap open ios
```
##🔥 Firebase Remote Config
Se conecta con Remote Config para controlar dinámicamente la visibilidad de tareas completadas (flag: showCompletedTasks).

## 👩‍💻 Desarrollado por
Iveth – Software Developer


