-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mer. 07 juin 2023 à 08:36
-- Version du serveur : 5.7.24
-- Version de PHP : 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `dunetaler`
--

-- --------------------------------------------------------

--
-- Structure de la table `campaign`
--

CREATE TABLE `campaign` (
  `id` int(11) NOT NULL,
  `array` text NOT NULL,
  `nb_col` int(11) NOT NULL,
  `nb_ligne` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `campaign`
--

INSERT INTO `campaign` (`id`, `array`, `nb_col`, `nb_ligne`) VALUES
(1, '[[1,1,1,2,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2],[2,2,1,2,1,2,2,2,2,1,1,2,2,2,2,1,1,1,1,1,2,2,2,2],[2,2,1,2,1,1,1,1,1,2,1,1,1,1,1,1,2,2,2,1,2,1,1,1],[2,2,1,2,2,2,2,1,1,2,2,2,2,2,2,2,1,1,1,1,2,1,2,1],[2,2,1,1,1,2,2,1,2,1,1,1,1,1,1,1,2,2,2,1,2,1,2,1],[2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,2,1]]', 24, 6),
(2, '[[1,1,1,1,1,2,1,1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2],[2,2,2,2,1,2,1,2,1,1,1,2,2,1,1,1,2,1,1,1,2,1,1,1],[1,1,1,2,1,1,1,2,1,2,2,1,1,1,2,1,2,1,2,1,2,1,2,1],[1,2,1,2,2,2,2,2,1,1,1,1,2,2,2,1,1,1,2,1,2,1,2,1],[1,2,1,1,1,1,1,1,1,2,2,2,1,1,1,1,2,2,2,1,1,1,2,1],[1,1,2,2,2,2,2,2,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,1]]', 24, 6),
(3, '[[1,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,2,2,1,1,1],[1,1,1,1,2,2,2,1,2,2,2,2,1,1,2,2,2,1,1,1,1,1,2,1],[2,1,2,1,2,2,2,1,1,1,1,1,2,2,1,1,1,2,2,2,2,2,2,1],[2,1,2,1,1,1,2,2,2,2,2,1,1,2,1,2,1,1,1,1,1,1,1,1],[2,1,1,2,2,1,1,1,1,1,1,1,2,2,1,2,2,2,2,2,2,2,2,2],[2,2,1,1,1,2,2,2,2,2,1,1,1,2,1,1,1,1,1,1,1,1,1,1]]', 24, 6),
(4, '[[1,1,2,2,1,1,1,2,1,1,1,5,1,1,1,2,1,1,1,1,1,1,1,2],[2,1,1,1,1,2,1,2,1,2,2,1,2,2,1,2,1,1,2,1,2,2,1,2],[1,1,2,2,5,2,1,1,1,2,1,1,1,2,1,2,2,1,2,1,2,2,5,2],[1,2,1,1,1,2,2,2,2,2,2,2,1,2,1,1,1,1,1,5,1,1,1,2],[1,1,2,2,2,1,1,5,1,1,1,2,1,2,2,2,2,2,2,1,5,5,5,1],[1,1,1,1,1,1,2,2,2,2,1,1,1,2,2,2,2,2,2,1,5,1,2,1]]', 24, 6),
(5, '[[1,2,2,2,2,2,2,1,1,1,2,2,2,2,2,2,2,5,1,1,1,2,2,2],[1,1,1,2,2,1,1,1,2,1,5,2,1,1,1,2,5,1,1,5,5,1,1,2],[2,2,1,2,2,1,5,2,2,1,2,2,1,5,1,2,5,2,2,2,5,5,5,2],[2,1,1,2,2,1,2,1,1,1,2,1,1,2,1,5,5,5,5,1,1,2,5,2],[2,1,2,2,2,1,5,5,2,2,1,5,2,1,1,2,1,2,1,2,1,2,1,1],[2,1,1,1,1,1,2,1,1,1,5,1,2,2,1,1,1,2,1,1,1,2,2,1]]', 24, 6),
(6, '[[1,1,1,1,2,1,2,2,2,1,1,2,5,1,1,1,1,1,1,1,1,1,1,2],[2,5,1,2,1,5,1,5,5,5,2,5,1,1,2,2,2,2,2,2,5,5,1,2],[2,1,5,2,5,1,5,1,5,1,2,2,2,1,5,1,1,1,1,2,2,5,5,2],[2,1,2,5,2,5,1,5,1,5,2,5,2,2,2,5,2,2,1,1,1,2,1,1],[2,1,1,1,5,1,2,2,2,1,5,1,2,2,2,1,2,2,1,2,1,1,2,5],[2,2,2,2,2,1,1,1,1,2,1,1,1,1,1,1,2,2,1,2,5,1,2,1]]', 24, 6),
(7, '[[1,2,2,2,4,2,2,1,1,1,1,1,1,1,2,2,4,2,1,1,1,2,2,2],[1,1,1,4,2,4,2,1,2,1,2,2,2,1,1,1,1,1,1,2,1,1,4,1],[2,2,1,1,1,1,1,5,1,5,1,1,4,2,2,2,2,2,2,2,2,2,2,4],[2,2,2,1,2,2,4,5,2,1,2,1,1,1,1,1,2,2,1,1,1,1,1,5],[4,1,1,1,1,1,2,5,1,1,2,2,4,2,2,1,1,1,1,2,2,2,2,5],[1,4,5,4,4,5,5,1,1,1,2,2,4,2,2,2,2,2,2,2,2,2,2,1]]', 24, 6),
(8, '[[1,2,4,4,5,5,1,1,1,1,4,2,2,2,1,1,1,1,2,2,2,2,2,2],[1,2,2,5,2,2,2,2,2,2,1,1,1,1,1,2,2,4,1,1,1,4,1,2],[1,1,1,5,1,1,2,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,1,2],[2,4,4,5,2,1,1,4,2,1,2,2,1,4,1,2,1,1,1,4,2,2,1,2],[2,2,2,4,2,2,2,2,2,1,1,1,1,2,1,1,1,2,2,1,1,1,1,5],[2,2,2,4,4,1,4,5,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1]]', 24, 6),
(9, '[[1,2,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,1],[1,1,2,2,2,5,2,2,4,2,5,1,1,2,4,5,5,5,5,5,4,4,1,5],[2,1,1,2,1,5,1,1,2,1,4,2,1,2,5,1,1,1,1,2,4,2,1,5],[5,1,1,1,1,5,2,1,1,2,2,2,1,2,5,5,1,5,1,1,1,1,1,5],[1,2,4,2,5,4,2,2,1,1,1,1,5,5,5,1,5,2,2,4,2,2,2,4],[2,2,4,2,5,1,5,5,5,5,5,5,1,1,4,5,2,2,4,2,4,2,2,1]]', 24, 6),
(10, '[[1,6,2,2,1,4,1,2,2,6,6,2,2,2,2,4,4,4,5,6,2,2,2,2],[6,1,2,6,4,2,1,1,1,1,1,1,2,6,6,1,1,1,2,1,1,1,1,2],[5,1,1,1,1,1,2,1,2,2,1,1,1,1,1,1,2,1,1,2,2,2,1,2],[2,2,4,6,4,6,2,2,2,1,2,1,2,2,2,2,5,4,1,2,1,1,1,1],[5,4,4,4,5,1,1,1,1,1,1,1,2,1,2,6,5,4,1,1,6,4,2,4],[2,4,5,6,5,1,5,5,5,5,5,5,5,6,1,5,6,5,4,5,5,1,2,1]]', 24, 6),
(11, '[[1,6,4,5,1,1,2,2,2,2,2,2,2,2,2,2,2,6,6,6,4,4,4,4],[2,1,2,2,2,1,1,1,1,1,6,2,2,2,2,2,2,6,2,2,1,2,2,5],[2,1,1,1,1,2,2,2,2,1,1,1,2,2,1,1,1,1,4,5,6,2,2,6],[2,1,2,2,1,1,1,2,2,1,2,1,2,2,1,2,2,6,1,2,4,2,2,6],[2,1,2,2,2,2,1,1,1,1,2,1,2,1,1,2,2,6,4,1,5,5,5,4],[2,1,6,1,6,2,2,2,2,2,2,1,1,1,4,4,4,1,1,5,1,2,2,1]]', 24, 6),
(12, '[[1,2,6,1,1,1,1,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],[6,1,1,2,6,1,2,1,2,2,2,2,1,1,1,2,2,2,1,5,1,2,2,2],[1,2,1,4,5,4,1,1,2,1,1,1,1,2,1,1,1,1,1,4,5,1,1,1],[6,2,1,6,2,5,4,6,2,1,2,2,2,2,2,2,2,2,2,6,5,2,2,1],[5,2,1,2,1,6,2,4,6,1,1,1,1,1,1,1,1,1,1,1,1,1,6,4],[6,1,1,1,1,4,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1]]', 24, 6),
(13, '[[1,4,4,4,5,5,5,5,5,5,6,1,2,2,2,2,1,6,1,2,2,2,2,2,2,2],[2,2,2,4,2,2,2,2,2,2,1,5,1,5,2,2,5,2,1,5,5,5,1,1,1,2],[4,6,2,4,2,1,2,2,1,2,1,1,5,2,2,2,5,2,2,2,2,2,2,2,1,2],[5,4,2,4,2,1,2,2,2,2,2,2,5,2,1,1,1,2,1,1,1,2,1,6,1,2],[2,2,2,4,2,1,1,5,6,1,2,2,5,2,1,2,5,2,1,2,5,2,1,2,1,2],[2,4,4,4,2,1,1,2,2,1,2,2,5,2,1,2,5,2,5,2,5,2,5,2,1,2],[2,4,2,2,2,2,1,5,5,1,2,2,6,2,1,2,1,2,5,2,1,2,5,2,1,2],[2,4,2,2,2,2,2,2,2,1,4,4,4,2,1,2,1,2,1,2,1,2,1,2,1,2],[2,4,1,1,1,6,1,1,1,1,4,2,5,2,1,2,1,2,1,2,1,2,1,2,1,4],[2,4,2,2,2,2,2,2,2,2,2,2,1,6,1,2,1,1,1,2,1,1,1,2,4,1]]', 26, 10),
(14, '[[1,4,4,4,1,5,5,5,1,1,6,2,2,2,2,2,1,6,1,2,2,2,2,2,2,2],[2,2,2,2,4,2,2,2,2,1,1,5,1,5,2,2,5,2,1,5,5,5,1,1,1,2],[4,6,2,4,1,1,2,2,1,5,1,2,5,2,2,2,5,2,2,2,2,2,2,2,1,2],[5,1,1,1,1,1,2,2,2,1,2,2,1,1,1,1,1,2,1,1,1,2,1,6,1,2],[2,1,2,4,1,2,2,5,6,1,2,2,5,2,1,2,5,2,1,2,5,2,1,1,1,2],[2,1,1,1,1,2,1,2,2,1,2,2,4,2,1,2,5,2,5,2,5,2,5,2,2,2],[2,4,1,2,1,2,2,5,5,1,2,2,6,2,2,2,1,2,5,2,1,2,5,2,1,2],[2,1,1,1,1,2,2,2,2,1,4,4,1,2,1,1,1,2,1,2,1,2,1,2,1,2],[2,4,1,1,1,6,1,1,1,1,4,2,5,2,1,2,6,2,5,2,5,2,1,5,1,4],[2,4,2,2,1,2,2,2,2,2,2,2,1,6,1,6,6,4,1,2,1,1,1,2,4,1]]', 26, 10),
(15, '[[1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,2,2,2],[6,1,2,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,2,1,2,1,1,1,2],[2,1,2,1,2,1,2,1,2,2,2,5,2,2,2,2,2,2,2,2,1,2,1,2,1,2],[2,1,4,1,4,1,4,1,2,2,2,5,2,2,1,1,1,1,1,2,1,2,1,2,1,2],[2,1,2,1,2,1,2,1,2,2,2,1,2,2,1,2,2,2,1,2,1,2,1,2,1,2],[2,1,2,1,2,1,2,1,2,1,2,2,2,2,1,2,5,2,1,2,1,2,1,1,5,1],[2,1,2,1,2,1,2,1,2,5,2,2,2,1,1,2,5,2,1,2,1,2,2,2,2,6],[2,1,2,1,2,1,2,1,2,1,1,2,2,1,2,2,5,2,1,1,1,2,2,2,2,1],[2,1,2,1,2,1,2,1,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,4],[2,1,1,1,2,1,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,1]]', 26, 10),
(16, '[[1,2,2,2,2,2,2,2,2,4,4,4,5,5,5,5,4,2,2,2,1,1,1,1,1,1],[1,1,1,2,2,2,2,2,4,2,4,2,2,2,2,5,4,4,2,2,1,2,2,2,2,1],[2,2,1,5,5,5,2,2,2,2,4,5,5,5,5,5,4,1,2,2,1,2,1,5,1,1],[2,2,1,1,2,2,2,2,4,4,4,2,2,2,2,1,4,1,2,4,1,2,4,4,2,2],[2,2,2,1,6,2,2,2,2,6,5,2,2,2,2,2,4,1,2,4,1,2,4,2,2,2],[2,2,2,2,1,1,4,4,4,4,5,2,4,2,2,2,4,1,1,1,6,1,1,1,1,1],[2,2,2,2,1,2,2,2,2,4,5,2,4,2,1,6,1,1,1,2,2,1,2,2,4,1],[2,2,2,2,1,2,2,2,2,6,5,2,4,2,1,2,2,2,2,2,2,1,2,2,4,6],[2,2,2,1,1,2,2,2,2,1,1,5,5,5,5,1,2,2,2,2,2,1,2,2,4,4],[2,2,2,1,1,5,1,2,2,4,1,4,1,4,5,5,6,2,2,2,2,1,2,2,4,1]]', 26, 10),
(17, '[[1,2,2,5,1,1,1,1,1,1,2,2,2,2,2,2,2,4,2,2,2,4,2,2,2,2],[1,2,2,2,2,2,2,2,2,1,2,2,4,4,4,1,1,1,1,1,1,1,1,2,4,2],[1,2,4,1,1,1,1,2,2,1,1,4,2,2,2,1,2,2,2,2,2,2,1,4,2,2],[1,2,1,1,2,2,5,4,2,4,1,1,1,4,2,1,1,1,1,1,1,2,1,1,1,2],[6,6,1,2,1,5,4,2,2,2,2,2,1,2,2,2,2,2,2,2,1,2,4,2,1,4],[2,2,4,4,5,1,5,1,6,1,1,4,1,2,2,2,1,1,1,2,1,1,1,2,1,2],[1,1,1,2,4,5,1,2,2,2,1,2,1,2,2,2,1,2,1,2,2,2,1,2,1,4],[1,2,5,1,1,2,4,4,2,4,1,2,1,1,1,1,1,2,1,2,2,2,1,2,1,4],[1,6,2,2,1,2,2,2,2,1,1,1,6,2,2,2,2,2,1,2,2,1,1,2,1,2],[2,1,1,1,1,2,2,2,2,1,5,5,5,6,1,1,1,1,1,1,1,1,2,4,1,4]]', 26, 10),
(18, '[[1,2,2,1,5,5,1,2,2,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,4,4],[1,2,2,1,1,2,1,2,2,4,2,4,4,4,2,2,2,2,2,2,2,2,1,1,1,4],[6,1,1,2,1,1,1,2,2,4,4,2,2,4,4,4,2,2,2,2,2,2,1,2,6,5],[2,2,1,2,1,2,4,6,1,2,4,4,2,4,2,4,2,1,1,1,1,2,1,2,6,5],[2,2,1,2,6,1,1,2,1,2,2,4,2,4,2,4,2,1,2,2,1,1,1,2,6,5],[2,2,1,6,2,2,1,2,1,4,4,4,2,4,2,4,2,1,1,2,2,4,4,4,6,5],[2,2,2,1,2,6,1,2,1,2,2,4,4,4,2,4,2,2,1,1,1,4,2,1,1,6],[1,1,1,6,2,1,2,1,1,2,2,2,2,2,2,1,1,1,2,2,1,4,2,1,4,4],[1,2,2,2,2,1,2,1,2,4,2,2,1,1,1,1,2,1,2,2,1,4,4,6,2,4],[1,1,1,1,1,1,2,1,1,1,1,1,1,2,2,4,4,1,1,1,1,2,2,1,4,1]]', 26, 10),
(19, '[[1,2,5,1,2,4,4,4,2,2,2,2,2,4,4,2,1,1,1,2,4,2,1,1,1,1,1,2,2,2],[1,1,2,1,1,2,2,4,2,4,4,4,4,4,6,2,1,2,2,1,1,1,1,2,2,2,1,1,1,2],[2,1,2,2,1,1,2,4,4,4,2,4,2,2,6,1,1,1,1,1,2,2,2,2,2,2,2,6,1,2],[2,1,1,2,2,1,2,2,2,2,6,1,1,1,6,2,2,1,2,1,1,2,2,2,1,1,1,2,1,1],[1,4,1,1,2,1,1,1,1,6,5,2,2,1,2,1,1,1,2,2,1,1,4,2,1,6,1,1,2,1],[5,5,2,1,1,2,4,2,1,6,5,2,2,1,1,1,4,2,2,4,4,2,1,1,1,1,2,1,1,1],[6,1,1,2,1,2,4,1,1,6,5,4,4,2,2,6,2,2,4,4,2,2,4,6,2,1,2,2,2,1],[1,2,1,1,1,2,2,1,2,2,5,2,4,2,4,4,4,4,4,6,2,2,4,2,1,1,2,6,1,1],[1,2,2,2,1,2,2,1,2,2,5,2,4,2,4,2,2,2,2,6,2,2,1,1,1,4,4,1,2,2],[1,1,2,2,1,2,1,1,1,1,1,1,2,2,1,2,1,1,1,2,1,1,1,2,2,4,6,1,1,4],[4,1,1,1,2,1,1,2,1,2,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,1,2,2,2,1],[1,2,2,1,1,1,2,1,1,2,2,2,2,2,2,2,1,1,2,2,2,4,1,6,4,1,1,1,2,1],[1,1,1,5,5,5,4,1,2,2,2,1,1,1,1,2,2,1,4,4,4,2,2,2,4,2,2,1,2,2],[2,2,1,5,5,5,5,5,5,5,5,6,2,2,1,1,1,1,2,2,4,4,4,4,4,2,2,1,5,1]]', 30, 14),
(20, '[[1,2,2,4,4,4,4,1,1,1,1,5,5,5,5,5,5,5,6,4,4,2,1,5,5,5,5,5,5,4],[6,2,2,4,2,2,2,1,2,2,2,2,2,1,1,1,1,2,2,5,4,4,5,4,2,1,1,1,1,5],[1,1,4,4,1,1,1,1,2,2,2,1,1,1,2,2,2,2,2,1,2,2,4,4,2,2,1,2,1,5],[2,1,1,2,1,2,2,2,2,2,2,1,2,2,1,1,1,2,2,6,1,1,2,2,1,4,1,1,6,5],[2,2,1,2,1,1,2,1,1,1,1,1,1,2,2,2,1,1,2,2,2,1,4,4,1,2,2,1,5,5],[2,1,1,2,2,1,2,1,2,1,2,2,1,2,2,2,2,1,1,1,2,1,2,2,1,1,2,1,5,5],[2,1,2,2,2,1,1,1,2,1,1,1,1,2,2,1,1,1,2,1,2,1,2,2,2,6,2,6,5,5],[2,1,1,2,2,1,2,2,2,2,2,1,2,1,1,1,2,2,2,1,2,1,1,4,5,5,5,5,5,4],[2,2,1,1,2,1,1,1,1,1,2,1,1,1,2,2,2,2,2,2,2,2,1,2,2,2,6,6,6,2],[1,1,2,1,2,2,2,2,2,1,2,1,2,2,2,2,2,4,4,2,2,2,1,1,1,2,1,2,1,2],[5,1,1,1,2,1,1,1,2,1,2,1,2,2,1,1,1,1,5,2,2,2,1,2,2,1,1,2,1,2],[5,2,2,2,1,1,2,1,2,1,2,1,1,1,1,2,1,2,6,2,1,1,1,2,2,2,2,1,1,2],[6,2,1,1,1,2,2,1,1,1,1,2,2,2,2,2,1,2,1,1,1,6,6,6,2,1,1,1,2,2],[1,1,1,2,2,2,2,2,2,2,1,1,1,1,1,1,1,2,2,2,2,2,2,6,2,1,5,5,1,1]]', 30, 14);

-- --------------------------------------------------------

--
-- Structure de la table `niveaux`
--

CREATE TABLE `niveaux` (
  `id` int(11) NOT NULL,
  `array_grid` text NOT NULL,
  `id_user` int(11) NOT NULL,
  `nb_col` int(11) NOT NULL,
  `nb_ligne` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `niveaux`
--

INSERT INTO `niveaux` (`id`, `array_grid`, `id_user`, `nb_col`, `nb_ligne`) VALUES
(72, '[[1,1],[4,1]]', 7, 2, 2),
(73, '[[1,2,2],[1,2,2],[4,1,1]]', 7, 3, 3),
(74, '[[1,2],[2,1]]', 7, 2, 2),
(75, '[[1,2,6],[1,2,2],[1,5,4],[1,4,5],[4,5,1]]', 7, 3, 5);

-- --------------------------------------------------------

--
-- Structure de la table `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `email` text NOT NULL,
  `mdp` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `players`
--

INSERT INTO `players` (`id`, `username`, `email`, `mdp`) VALUES
(7, 'Pang0lla1n', 'julesroydev@gmail.com', '$2y$10$DEscTZQHTZR8S0MSAeNV0e4o7wUdfE/vOGk9r7Q5E42FOQQ2zopb.');

-- --------------------------------------------------------

--
-- Structure de la table `scores`
--

CREATE TABLE `scores` (
  `id` int(11) NOT NULL,
  `score` text NOT NULL,
  `joueur` text NOT NULL,
  `id_niveau` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `scores`
--

INSERT INTO `scores` (`id`, `score`, `joueur`, `id_niveau`, `id_user`) VALUES
(1, '1000', 'Pang0lla1n', 0, 0),
(2, '2000', 'Pang0lla1n', 0, 0),
(3, '3000', 'Pang0lla1n', 0, 0),
(4, '4000', 'Pang0lla1n', 0, 0),
(5, '5000', 'Pang0lla1n', 0, 0),
(6, '6000', 'Pang0lla1n', 0, 0),
(8, '00:10', 'Pang0lla1n', 1, 7),
(11, '00:09', 'Pang0lla1n', 2, 7),
(12, '00:11', 'Pang0lla1n', 3, 7),
(13, '00:20', 'Pang0lla1n', 9, 7),
(14, '00:01', 'Pang0lla1n', 72, 7),
(15, '00:39', 'Pang0lla1n', 20, 7);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `campaign`
--
ALTER TABLE `campaign`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `niveaux`
--
ALTER TABLE `niveaux`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_user_2` (`id_user`);

--
-- Index pour la table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `campaign`
--
ALTER TABLE `campaign`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `niveaux`
--
ALTER TABLE `niveaux`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT pour la table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `scores`
--
ALTER TABLE `scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
