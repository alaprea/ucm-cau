-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-11-2022 a las 12:28:15
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ucm_cau`
--
CREATE DATABASE IF NOT EXISTS `ucm_cau` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `ucm_cau`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ucm_aw_cau_avi_avisos`
--

DROP TABLE IF EXISTS `ucm_aw_cau_avi_avisos`;
CREATE TABLE `ucm_aw_cau_avi_avisos` (
  `_ID` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idTecnico` int(11) DEFAULT NULL,
  `categoria` varchar(15) NOT NULL,
  `tipo` int(11) NOT NULL,
  `observaciones` varchar(1000) NOT NULL,
  `comentarios` varchar(1000) DEFAULT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `cerrado` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ucm_aw_cau_avi_avisos`
--

INSERT INTO `ucm_aw_cau_avi_avisos` (`_ID`, `idUsuario`, `idTecnico`, `categoria`, `tipo`, `observaciones`, `comentarios`, `fecha`, `cerrado`) VALUES
(1, 2, 1, 'Felicitación', 30, 'Me han recomendado un libro excelente', NULL, '2022-11-23 14:50:46', 0),
(2, 2, 1, 'Sugerencia', 13, 'Creo que el cortafuegos corporativo iam labore takimata clita. Erat dolores et illum duis. Molestie et ad takimata euismod rebum qui diam aliquam accumsan accusam consectetuer dignissim amet vulputate iriure labore. Erat magna erat', 'Duo minim duo odio tempor sit dolore veniam voluptua amet ea justo consectetuer ipsum sadipscing dolor sanctus. Id et sit ut. Nonumy et at adipiscing eos ex elitr qui voluptua et velit sed. Sadipscing aliquyam dolore diam dolore et rebum voluptua dolor aliquip sit no magna diam ex dolor. Dolor eum dolore elitr sit amet sed amet. Clita duo nulla diam sanctus elitr delenit takimata eum dolor eros. Sit facilisis esse dolor sed. In erat duo justo elitr gubergren in accusam no voluptua.', '2022-11-01 22:21:36', 0),
(3, 5, 4, 'Incidencia', 19, 'No puedo conectarme a Collaborate Kasd adipiscing voluptua amet consequat dolor accumsan sed rebum ipsum. Elitr ea veniam luptatum justo et qui nonumy nulla nobis lorem amet adipiscing voluptua nulla eirmod consetetur. Voluptua consequat labore quod eros eos delenit feugait autem blandit dolore dolor nobis kasd enim kasd. Magna erat elit placerat lorem. Consetetur sed tempor at possim ut facilisi sanctus delenit magna. Labore ut rebum duis dolor erat. Et aliquyam dolor sea nisl lorem iriure duis eirmod ullamcorper lorem elitr dolor suscipit accusam diam sed nulla esse. Voluptua duo lorem duis duo. Takimata suscipit dolor eu accusam labore et sed. At mazim invidunt takimata eirmod et. Lorem ut invidunt accusam aliquip invidunt duo aliquyam eos justo ea takimata voluptua facilisi voluptua invidunt nonumy sit. Labore consetetur invidunt ut justo diam clita sed nonumy ex diam nulla amet eos magna ipsum. Vel erat dolor nisl facer sit te dolor et tincidunt.', NULL, '2022-10-16 11:42:35', 0),
(4, 5, NULL, 'Felicitación', 39, 'Buen servicio como siempre accusam dolore clita tempor sit rebum rebum te sed. Aliquam volutpat facilisis aliquam molestie ex at ipsum amet duo gubergren elit sed lorem dignissim rebum. Nulla amet dolore stet sed suscipit.', NULL, '2022-01-10 13:50:20', 0),
(5, 6, NULL, 'Queja', 4, 'Liber sanctus vero magna eos feugait duis sit dolore sed et lobortis accumsan dolores dolore. Laoreet sit takimata ut congue nonumy dolor dolores. Clita dolor et dolores facilisis sadipscing. Sed eirmod dolores lobortis sit amet molestie diam accusam takimata aliquyam diam. Clita feugait sanctus tempor sadipscing duis esse. Stet praesent luptatum vero laoreet.', NULL, '2022-12-07 23:07:26', 0),
(6, 6, 1, 'Incidencia', 3, 'Amet tempor diam facilisi eirmod sea dolor gubergren stet ex et. Velit qui adipiscing magna dolor nibh eos volutpat. Et vero possim clita dolore sed diam sed. Accusam magna option. Dolor vero velit gubergren feugiat labore duis eu duis autem soluta lorem ut te quod molestie ut et et. No erat rebum erat iriure dolor justo lobortis duo at facilisis invidunt et feugait ut amet elitr.', 'Ya se le ha informado en otras ocasiones de que \r\nOdio feugait vero molestie placerat et eu illum tempor stet facilisis elitr sea consetetur ut sed ea ullamcorper aliquyam. Justo praesent imperdiet elitr adipiscing iusto aliquyam amet est qui et et ea. Vero vulputate dolor amet facer accumsan facilisi ut consetetur nulla. Consequat no kasd et sit magna sanctus sit nostrud ea lorem rebum magna dolor. Dolore dolore ut.', '2022-10-03 20:07:48', 1),
(7, 6, NULL, 'Queja', 3, 'Dolore at dolore ut consetetur tempor sea amet diam delenit ex odio sit magna ipsum et consectetuer gubergren. Ea et lorem sed quis et et sanctus magna takimata et et nulla aliquyam iusto. Et exerci amet dolor adipiscing dolor option eos nonumy. Accusam diam lorem amet tempor tempor labore invidunt lorem lorem no labore lorem in. Te voluptua eirmod nostrud et vero facilisi stet aliquyam consequat sed placerat nisl nulla stet. Sadipscing ipsum diam est nostrud tation no assum duo lorem feugait vero dolor magna molestie. Aliquam ipsum invidunt. Clita diam mazim sed. Et vero eirmod sea magna sit sed. Dolor et magna ad hendrerit ea tempor feugiat. Sed dolores lorem volutpat et dolore dolore nulla et.', NULL, '2022-11-13 12:08:06', 0),
(8, 6, NULL, 'Felicitación', 32, 'Wisi ut sit eirmod ex dolor nulla rebum iriure dolor dolores illum diam rebum sit odio. Ut est dignissim lorem aliquyam eirmod est labore amet lobortis sea eos elitr elitr. Sed est lorem suscipit aliquip duo gubergren dolor et doming vel ut nulla tation amet sed iriure dolor vulputate. Dolore voluptua nostrud illum ea sit eirmod. Dolor amet ullamcorper amet tincidunt dolor accusam et et voluptua nonumy eos consequat erat. Elitr dolor stet imperdiet facilisi amet augue et wisi dolore et lorem. Sed vel sadipscing est sit erat lorem labore ut dolore illum aliquyam hendrerit ea voluptua luptatum.', NULL, '2022-12-14 18:08:34', 0),
(9, 2, 4, 'Queja', 18, 'Mi queja es porque el aula virtual tiene un problema eleifend. No nonummy stet nulla dolores invidunt stet invidunt erat illum praesent in sit et. Duis magna stet sea kasd ipsum. Eirmod illum at. Sit tempor velit sed sit voluptua sadipscing ', 'Erat hendrerit elitr nostrud ut feugiat sea nonumy volutpat ad diam sit vero sed suscipit. Ipsum in ut vel sanctus sit justo nonumy et luptatum sed molestie sed aliquyam dolor diam ipsum ipsum minim. Eos stet eos takimata at eu stet consequat sanctus dolor vero takimata ipsum odio sit labore justo ut.', '2022-12-14 23:12:16', 0),
(10, 2, NULL, 'Incidencia', 16, 'Hoy no funciona la edruam Odio feugait vero molestie placerat et eu illum tempor stet facilisis elitr sea consetetur ut sed ea ullamcorper aliquyam. Justo praesent imperdiet elitr adipiscing iusto aliquyam amet est qui et et ea. Vero vulputate dolor amet facer accumsan facilisi ut consetetur nulla. Consequat no kasd et sit magna sanctus sit nostrud ea lorem rebum magna dolor. Dolore dolore ut.', NULL, '2022-12-14 23:13:23', 0),
(11, 5, 1, 'Sugerencia', 17, 'La semana que viene estará de visita Elitr et sit dolore nam diam consectetuer ut dolor dolores eirmod feugiat sit nibh sadipscing liber erat dolore. Suscipit voluptua justo voluptua voluptua at labore elitr diam rebum at ipsum duo justo ipsum. Gubergren dolore possim amet in invidunt ipsum hendrerit vero diam eros ut gubergren. Necesitamos saber como se accede al wifi pra visitantes', NULL, '2022-12-14 23:17:36', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ucm_aw_cau_nem_numempleado`
--

DROP TABLE IF EXISTS `ucm_aw_cau_nem_numempleado`;
CREATE TABLE `ucm_aw_cau_nem_numempleado` (
  `nEmpleado` varchar(8) NOT NULL,
  `idUsuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ucm_aw_cau_nem_numempleado`
--

INSERT INTO `ucm_aw_cau_nem_numempleado` (`nEmpleado`, `idUsuario`) VALUES
('0198-kne', NULL),
('2837-tto', NULL),
('4755-oqn', NULL),
('9382-adf', NULL),
('4361-ieh', 1),
('9473-mzw', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ucm_aw_cau_tip_tipo`
--

DROP TABLE IF EXISTS `ucm_aw_cau_tip_tipo`;
CREATE TABLE `ucm_aw_cau_tip_tipo` (
  `_ID` int(11) NOT NULL,
  `categoria` varchar(30) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `Alumno` tinyint(1) NOT NULL DEFAULT 1,
  `PAS` tinyint(1) NOT NULL DEFAULT 1,
  `PDI` tinyint(1) NOT NULL DEFAULT 1,
  `AA` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ucm_aw_cau_tip_tipo`
--

INSERT INTO `ucm_aw_cau_tip_tipo` (`_ID`, `categoria`, `tipo`, `Alumno`, `PAS`, `PDI`, `AA`) VALUES
(1, 'Administración digital', 'Certificado digital de persona física', 1, 1, 1, 0),
(2, 'Administración digital', 'Certificado electrónico de empleado público ', 0, 1, 1, 0),
(3, 'Administración digital', 'Registro electrónico ', 1, 1, 1, 1),
(4, 'Administración digital', 'Sede electrónica', 1, 1, 1, 1),
(5, 'Administración digital', 'Portafirmas', 0, 1, 1, 0),
(6, 'Comunicaciones', 'Correo electrónico', 1, 1, 1, 1),
(7, 'Comunicaciones', 'Google Meet', 1, 1, 1, 1),
(8, 'Comunicaciones', 'Cuenta de Alumno', 1, 0, 0, 1),
(9, 'Comunicaciones', 'Cuenta de personal', 0, 1, 1, 0),
(10, 'Comunicaciones', 'Cuenta genérica', 0, 1, 1, 0),
(11, 'Conectividad', 'Cuenta a la Red SARA', 0, 1, 0, 0),
(12, 'Conectividad', 'Conexión por cable en despachos ', 0, 1, 1, 0),
(13, 'Conectividad', 'Cortafuegos corporativo', 1, 1, 1, 0),
(14, 'Conectividad', 'Resolución de nombres de dominio (DNS)', 0, 1, 0, 0),
(15, 'Conectividad', 'VPN Acceso remoto', 1, 1, 1, 0),
(16, 'Conectividad', 'Wifi Eduroam (ssid: eduroam) ', 1, 1, 1, 0),
(17, 'Conectividad', 'Wifi para visitantes (ssid: UCM-Visitantes) ', 0, 1, 1, 0),
(18, 'Docencia', 'Aula Virtual', 1, 0, 1, 0),
(19, 'Docencia', 'Blackboard Collaborate', 0, 1, 1, 0),
(20, 'Docencia', 'Listados de clase', 0, 1, 1, 0),
(21, 'Docencia', 'Moodle: Aula Global', 1, 1, 1, 0),
(22, 'Docencia', 'Plataforma de cursos online Privados', 1, 0, 1, 0),
(23, 'Web', 'Analitica Web', 0, 1, 1, 0),
(24, 'Web', 'Emisión de certificados SSL', 0, 1, 1, 0),
(25, 'Web', 'Hosting: alojamiento de páginas web ', 0, 1, 1, 0),
(26, 'Web', 'Portal de eventos', 1, 1, 1, 1),
(27, 'Web', 'Redirecciones web', 0, 1, 1, 0),
(28, 'Felicitación', 'Archivo Universitario', 1, 1, 1, 1),
(29, 'Felicitación', 'Asesoría Jurídica', 1, 1, 1, 1),
(30, 'Felicitación', 'Biblioteca', 1, 1, 1, 1),
(31, 'Felicitación', 'Centro de Información', 1, 1, 1, 1),
(32, 'Felicitación', 'Departamentos docentes', 1, 1, 1, 1),
(33, 'Felicitación', 'Inspección de Servicios', 1, 1, 1, 1),
(34, 'Felicitación', 'Oficina de Gestión de Infraestructuras', 1, 1, 1, 1),
(35, 'Felicitación', 'Servicio de Administración', 1, 1, 1, 1),
(36, 'Felicitación', 'Servicios Informáticos', 1, 1, 1, 1),
(37, 'Felicitación', 'Servicio de Documentación', 1, 1, 1, 1),
(38, 'Felicitación', 'Servicio de Imprenta', 1, 1, 1, 1),
(39, 'Felicitación', 'Servicio de Cafetería', 1, 1, 1, 1),
(40, 'Felicitación', 'Toda la Universidad', 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ucm_aw_cau_usu_usuarios`
--

DROP TABLE IF EXISTS `ucm_aw_cau_usu_usuarios`;
CREATE TABLE `ucm_aw_cau_usu_usuarios` (
  `_ID` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(60) NOT NULL,
  `perfil_universitario` varchar(15) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `ucm_aw_cau_usu_usuarios`
--

INSERT INTO `ucm_aw_cau_usu_usuarios` (`_ID`, `email`, `username`, `password`, `perfil_universitario`, `fecha`, `activo`) VALUES
(1, 'felipe.lotas@ucm.es', 'Felipe Lotas', '$2b$10$02spHNI3nYWNLcePNCzyJekkOyDYsCo/.sHykF5FKw0Gbtj6/M1x2', 'Técnico', '2022-11-09 18:15:39', 1),
(2, 'bill.puertas@ucm.es', 'Bill Puertas', '$2b$10$GLyUHYcG0x7SoC9DPnuHV.yKt6HK.jx4IO9ikYQ4/T02Td7bRpLQ.', 'Alumno', '2022-11-13 12:00:30', 1),
(3, 'steve.curros@ucm.es', 'Steve Curros', '$2b$10$SoyBZzXWm/y6R6P6.WQsu.ZFsKGbkWvU.Z9BZoMDc9PEAup5klByK', 'PDI', '2022-11-15 17:12:13', 1),
(4, 'aitor.tilla@ucm.es', 'Aitor Tilla', '$2b$10$o3C5.1TUHQMBij9l04QwueYID0f6SX4lvkNkQhYGm4/WaO1nDSWU.', 'Técnico', '2022-11-21 12:43:55', 1),
(5, 'alba.sura@ucm.es', 'Alba Sura', '$2b$10$x7vXuvsL01oj1nq3APH9VedtsgXCjLuKHoD3ymfoWweflExamDDZu', 'PAS', '2022-01-17 21:19:27', 1),
(6, 'andres.trozado@ucm.es', 'Andres Trozado', '$2b$10$W3lMegw5ResbmLpOdBH8XuEGycYykJmT7yJC3kJMb0uU4t1nEpXzG', 'AA', '2022-01-28 17:42:31', 1);

--
-- Usuarios y contraseñas para pruebas
-- 'felipe.lotas@ucm.es' : 'Felipe123*' 
-- 'bill.puertas@ucm.es' : 'Bill123*'
-- 'steve.curros@ucm.es' : 'Steve123*'
-- 'aitor.tilla@ucm.es'  : 'Aitor123*'
-- 'alba.sura@ucm.es'    : 'Alba123*'
-- 'andres.trozado@ucm.es' :  'Andres123*'
--

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `ucm_aw_cau_avi_avisos`
--
ALTER TABLE `ucm_aw_cau_avi_avisos`
  ADD PRIMARY KEY (`_ID`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idTecnico` (`idTecnico`),
  ADD KEY `tipo` (`tipo`);

--
-- Indices de la tabla `ucm_aw_cau_nem_numempleado`
--
ALTER TABLE `ucm_aw_cau_nem_numempleado`
  ADD PRIMARY KEY (`nEmpleado`),
  ADD UNIQUE KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `ucm_aw_cau_tip_tipo`
--
ALTER TABLE `ucm_aw_cau_tip_tipo`
  ADD PRIMARY KEY (`_ID`);

--
-- Indices de la tabla `ucm_aw_cau_usu_usuarios`
--
ALTER TABLE `ucm_aw_cau_usu_usuarios`
  ADD PRIMARY KEY (`_ID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ucm_aw_cau_avi_avisos`
--
ALTER TABLE `ucm_aw_cau_avi_avisos`
  MODIFY `_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `ucm_aw_cau_tip_tipo`
--
ALTER TABLE `ucm_aw_cau_tip_tipo`
  MODIFY `_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `ucm_aw_cau_usu_usuarios`
--
ALTER TABLE `ucm_aw_cau_usu_usuarios`
  MODIFY `_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ucm_aw_cau_avi_avisos`
--
ALTER TABLE `ucm_aw_cau_avi_avisos`
  ADD CONSTRAINT `ucm_aw_cau_avi_avisos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `ucm_aw_cau_usu_usuarios` (`_ID`),
  ADD CONSTRAINT `ucm_aw_cau_avi_avisos_ibfk_2` FOREIGN KEY (`idTecnico`) REFERENCES `ucm_aw_cau_usu_usuarios` (`_ID`),
  ADD CONSTRAINT `ucm_aw_cau_avi_avisos_ibfk_3` FOREIGN KEY (`tipo`) REFERENCES `ucm_aw_cau_tip_tipo` (`_ID`);

--
-- Filtros para la tabla `ucm_aw_cau_nem_numempleado`
--
ALTER TABLE `ucm_aw_cau_nem_numempleado`
  ADD CONSTRAINT `ucm_aw_cau_nem_numempleado_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `ucm_aw_cau_usu_usuarios` (`_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
