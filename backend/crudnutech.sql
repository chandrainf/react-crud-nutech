-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 10, 2021 at 10:19 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crudnutech`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `productName` varchar(64) NOT NULL,
  `purchasePrice` int(64) NOT NULL,
  `salePrice` int(64) NOT NULL,
  `image` varchar(128) NOT NULL,
  `stock` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `productName`, `purchasePrice`, `salePrice`, `image`, `stock`) VALUES
(29, 'apple iphone 12 mini', 20000000, 25000000, 'http://localhost:8080/image/1625947440620-apple iphone 12 mini.jpg', 12),
(30, 'apple iphone 12', 25000000, 28000000, 'http://localhost:8080/image/1625947578545-apple iphone 12.jpg', 12),
(31, 'Google Pixel 4A', 25000000, 30000000, 'http://localhost:8080/image/1625947633617-google pixel 4A.jpg', 12),
(32, 'One Plus 9', 15000000, 18000000, 'http://localhost:8080/image/1625947688688-oneplus 9.jpg', 12),
(33, 'Samsung Galaxy 21 Ultra', 25000000, 28000000, 'http://localhost:8080/image/1625947734685-samsung galaxy 21 ultra.jpg', 12),
(34, 'Samsung Galaxy A52 5G', 15000000, 18000000, 'http://localhost:8080/image/1625947797761-samsung galaxy a52 5G.jpg', 12),
(35, 'Samsung Galaxy SE 20 Ultra', 30000000, 32000000, 'http://localhost:8080/image/1625947869389-samsung galaxy note 20 ultra.jpg', 12),
(36, 'Samsung Galaxy S21 ', 17000000, 19000000, 'http://localhost:8080/image/1625947923968-samsung galaxy s21.jpg', 12),
(37, 'Samsung Galaxy Z Fold 2', 35000000, 38000000, 'http://localhost:8080/image/1625947965472-samsung galaxy z fold 2.jpg', 12);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
