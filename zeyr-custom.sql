-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 22, 2024 at 12:44 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zeyr-custom`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `company` varchar(50) NOT NULL,
  `addressLine1` varchar(255) NOT NULL,
  `addressLine2` varchar(255) DEFAULT NULL,
  `city` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `zipCode` varchar(10) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `isDefault` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `user_id`, `email`, `firstName`, `lastName`, `company`, `addressLine1`, `addressLine2`, `city`, `country`, `zipCode`, `phone`, `isDefault`, `created_at`) VALUES
(30, 23, 'omerfarooqkhan7210@gmail.com', 'omer', 'khan', 'ii', 'gnero', 'ogvnrvjnr', 'karachi', 'Malaysia', '35700', '+923343779404', 1, '2023-11-25 15:46:44'),
(31, 23, 'omerfarooqkhan7210@gmail.com', 'omer', 'khan', 'ii', 'gnero', 'ogvnrvjnr', 'karachi', 'Malaysia', '35700', '+923343779404', 1, '2023-11-25 15:53:45'),
(32, 23, 'omerfarooqkhan7210@gmail.com', 'omer', 'khan', 'ii', 'gnero', 'ogvnrvjnr', 'karachi', 'Malaysia', '35700', '+923343779404', 1, '2023-11-25 16:01:19'),
(33, 23, 'omerfarooqkhan7210@gmail.com', 'omer', 'khan', 'ii', 'gnero', 'ogvnrvjnr', 'karachi', 'Pakistan', '35700', '03343779404', 1, '2023-11-25 16:07:11'),
(34, 23, 'omerfarooqkhan7210@gmail.com', 'omer', 'khan', 'ii', 'gnero', 'ogvnrvjnr', 'karachi', 'Pakistan', '35700', '+923343779404', 1, '2023-11-25 16:18:18'),
(35, 28, 'researchmate8@gmail.com', 'Rizwan', 'Sheikh', 'Giants Solutions', 'Karachi , Pakistan', '', 'HOUSTON', 'Qatar', 'TEXAS', '+923212998045', 1, '2023-11-27 17:58:45'),
(36, 24, 'charliechaplin565@gmail.com', 'omer', 'khan', 'gtgtr', 'gever', 'refer', 'karachi', 'Pakistan', '75300', '+924356346346', 1, '2023-12-01 15:06:55'),
(37, 24, 'charliechaplin565@gmail.com', 'omer', 'khan', 'gtgtr', 'gever', 'refer', 'karachi', 'Pakistan', '75300', '+924356346346', 1, '2023-12-01 15:22:47'),
(38, 24, 'charliechaplin565@gmail.com', 'omer', 'khan', 'gtgtr', 'gever', 'refer', 'karachi', 'Pakistan', '75300', '+924356346346', 1, '2023-12-01 15:46:53');

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `email`, `password`) VALUES
(1, 'omerfarooqkhan7210@gmail.com', '$2b$10$gtP783nbcBX3vpDDqWMVauR77FRGHY1rfHz/Gt.EqAMZv7LF57nd2');

-- --------------------------------------------------------

--
-- Table structure for table `attributes`
--

CREATE TABLE `attributes` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `attributeType` enum('color','size') NOT NULL,
  `attributeValue` varchar(255) NOT NULL,
  `attributeprice` decimal(10,0) NOT NULL,
  `attributestock` int(11) NOT NULL,
  `attributeimg` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attributes`
--

INSERT INTO `attributes` (`id`, `productId`, `attributeType`, `attributeValue`, `attributeprice`, `attributestock`, `attributeimg`) VALUES
(29, 17, 'color', 'red', 0, 0, ''),
(30, 17, 'size', 'xl', 0, 0, ''),
(31, 17, 'color', 'blue', 0, 0, ''),
(32, 17, 'size', 'l', 0, 0, ''),
(33, 18, 'color', 'red', 0, 0, ''),
(34, 18, 'size', 'xxl', 0, 0, ''),
(35, 19, 'color', 'BLUE', 0, 0, ''),
(36, 19, 'size', 'L', 0, 0, ''),
(37, 20, 'color', 'BROWN', 0, 0, ''),
(38, 20, 'size', 'XL', 0, 0, ''),
(42, 22, 'color', 'GREEN', 0, 0, ''),
(43, 22, 'size', 'L', 0, 0, ''),
(44, 23, 'color', 'BLUE', 0, 0, ''),
(45, 23, 'size', 'XL', 0, 0, ''),
(46, 24, 'color', 'RED', 0, 0, ''),
(58, 43, 'color', 'red', 10, 5, ''),
(59, 43, 'size', 'xxl', 10, 5, ''),
(60, 44, 'color', 'red', 10, 5, ''),
(61, 44, 'size', 'xxl', 10, 5, ''),
(62, 45, 'color', 'red', 10, 5, ''),
(63, 45, 'size', 'xxl', 10, 5, ''),
(64, 46, 'color', 'red', 10, 5, ''),
(65, 46, 'size', 'xxl', 10, 5, '');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `user_id` varchar(500) NOT NULL,
  `prod_id` int(11) NOT NULL,
  `selectedVariations` text DEFAULT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id`, `user_id`, `prod_id`, `selectedVariations`, `quantity`) VALUES
(69, '80201791-e4d1-42e4-b5d1-dded6c001503', 18, '{\"color\":\"red\",\"size\":\"xxl\"}', 135),
(72, 'ade79ea3-b60f-4b9c-aee3-fe6e1f865f87', 18, '{\"color\":\"red\",\"size\":\"xxl\"}', 5),
(73, '80201791-e4d1-42e4-b5d1-dded6c001503', 17, '{\"color\":\"red\",\"size\":\"xl\"}', 1),
(74, '80201791-e4d1-42e4-b5d1-dded6c001503', 18, '{\"color\":\"red\",\"size\":\"xxl\"}', 135),
(75, '80201791-e4d1-42e4-b5d1-dded6c001503', 1, '\"\"', 1),
(76, '80201791-e4d1-42e4-b5d1-dded6c001503', 1, '\"\"', 1);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `parentId` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`_id`, `name`, `parentId`, `createdAt`, `updatedAt`) VALUES
(1, 'MEN', NULL, '2023-10-27 15:12:42', '2023-10-27 15:12:42'),
(2, 'TEES', 1, '2023-10-27 15:12:56', '2023-10-27 15:12:56'),
(3, 'WOMEN', NULL, '2023-10-27 15:13:04', '2023-10-27 15:13:04'),
(4, 'jewelry', NULL, '2023-11-04 13:21:25', '2023-11-04 13:21:25'),
(5, 'TEES', 3, '2023-11-04 13:21:35', '2023-11-04 13:21:35');

-- --------------------------------------------------------

--
-- Table structure for table `completed_orders`
--

CREATE TABLE `completed_orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `formatted_order_id` varchar(255) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `prod_id` int(11) DEFAULT NULL,
  `selectedVariations` varchar(255) NOT NULL,
  `prod_quantity` int(11) DEFAULT NULL,
  `order_status` enum('pending','completed','failed','refunded','on hold','processing','draft') NOT NULL,
  `barcode_id` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `completed_orders`
--

INSERT INTO `completed_orders` (`id`, `formatted_order_id`, `order_id`, `prod_id`, `selectedVariations`, `prod_quantity`, `order_status`, `barcode_id`) VALUES
(57, '#0517', 517, 23, '{\"color\":\"BLUE\",\"size\":\"XL\"}', 1, 'pending', 'x1ZzcnRbIL'),
(58, '#0517', 517, 22, '{\"color\":\"GREEN\",\"size\":\"L\"}', 1, 'pending', 'x1ZzcnRbIL'),
(59, '3825', 3825, 18, '{\"color\":\"red\",\"size\":\"xxl\"}', 1, 'completed', 'hwwgMwBQPX'),
(60, '1602', 1602, 17, '{\"color\":\"blue\",\"size\":\"xl\"}', 1, 'pending', '8FfhljCd6F'),
(61, '1602', 1602, 18, '{\"color\":\"red\",\"size\":\"xxl\"}', 1, 'pending', '8FfhljCd6F');

-- --------------------------------------------------------

--
-- Table structure for table `contact_mails`
--

CREATE TABLE `contact_mails` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `orderNumber` varchar(255) NOT NULL,
  `productInfo` varchar(255) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `contact_mails`
--

INSERT INTO `contact_mails` (`user_id`, `name`, `email`, `phone`, `orderNumber`, `productInfo`, `message`) VALUES
(1, 'omer khan', 'omerfarooqkhan7210@gmail.com', '03343779404', '3e322332', '', 'gffrfdsf'),
(2, 'omer khan', 'omerfarooqkhan7210@gmail.com', '923343779404', '3e322332', 'order-status', 'dsfdsfdsfd'),
(3, 'omer khan', 'omerfarooqkhan7210@gmail.com', '923343779404', '3e322332', 'order-status', 'TGFDHGFHGFHGFH'),
(4, 'omer khan', 'omerfarooqkhan7210@gmail.com', '923343779404', '3e322332', 'other', 'fgfdg');

-- --------------------------------------------------------

--
-- Table structure for table `exchange_rates`
--

CREATE TABLE `exchange_rates` (
  `currency_code` varchar(10) NOT NULL,
  `exchange_rate` decimal(10,4) NOT NULL,
  `fetched_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `memberships`
--

CREATE TABLE `memberships` (
  `membership_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `duration_months` int(11) NOT NULL,
  `apparel_discount` decimal(5,2) NOT NULL DEFAULT 0.00,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `memberships`
--

INSERT INTO `memberships` (`membership_id`, `name`, `price`, `duration_months`, `apparel_discount`, `description`) VALUES
(1, 'Bronze Membership', 50.00, 12, 0.05, 'Basic membership with standard benefits.'),
(2, 'Silver Membership', 100.00, 12, 0.10, 'Enhanced membership with additional perks.'),
(3, 'Gold Membership', 150.00, 12, 0.20, 'Premium membership with exclusive benefits.');

-- --------------------------------------------------------

--
-- Table structure for table `notified_users`
--

CREATE TABLE `notified_users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `subscribed_date` datetime NOT NULL,
  `subscribed_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `b_address_id` int(11) NOT NULL,
  `cart_items_id` int(11) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `total_price_with_shipping` decimal(10,2) NOT NULL,
  `currency_code` varchar(5) NOT NULL,
  `shipping_methods_id` int(11) NOT NULL,
  `payment_status` enum('pending','completed') DEFAULT 'pending',
  `order_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `order_id`, `user_id`, `b_address_id`, `cart_items_id`, `total_price`, `total_price_with_shipping`, `currency_code`, `shipping_methods_id`, `payment_status`, `order_date`) VALUES
(28, 517, 23, 30, 66, 65.00, 85.00, 'USD', 2, 'completed', '2023-11-25 16:07:15'),
(29, 517, 23, 30, 67, 65.00, 85.00, 'USD', 2, 'completed', '2023-11-25 16:07:15'),
(30, 3825, 23, 30, 68, 25.00, 45.00, 'USD', 2, 'completed', '2023-11-25 16:18:22'),
(31, 1602, 28, 35, 70, 35.00, 85.00, 'USD', 1, 'completed', '2023-11-27 17:59:13'),
(32, 1602, 28, 35, 69, 35.00, 85.00, 'USD', 1, 'completed', '2023-11-27 17:59:13');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `categories` varchar(255) DEFAULT NULL,
  `sku` varchar(50) DEFAULT NULL,
  `isOnSale` tinyint(1) NOT NULL,
  `isFeatured` tinyint(1) NOT NULL,
  `videos` text DEFAULT NULL,
  `shortDescription` text DEFAULT NULL,
  `longDescription` text DEFAULT NULL,
  `featuredImage` varchar(1000) DEFAULT NULL,
  `productImages` text DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `barcode_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `categories`, `sku`, `isOnSale`, `isFeatured`, `videos`, `shortDescription`, `longDescription`, `featuredImage`, `productImages`, `status`, `createdAt`, `updatedAt`, `barcode_id`) VALUES
(17, 'PRODUCT 1', 25.00, 'MEN', '1234', 0, 1, '', 'SHORT', 'LONG', 'featuredImage-1699102127291-635084858.jpg', '[\"thumbnailImages-1699102127291-372546478.jpg\"]', 'published', '2023-11-04 12:48:47', '2024-01-08 17:20:09', '4msdb7NS4z'),
(18, 'PRODUCT 2', 25.00, 'WOMEN', '1235', 0, 1, '', 'SHORT', 'LONG', 'featuredImage-1699103786810-974460842.jpg', '[\"thumbnailImages-1699103786810-48581203.jpg\"]', 'published', '2023-11-04 13:16:26', '2024-01-08 17:20:09', '5Duoj0QEWJ'),
(19, 'PRODUCT 3', 25.00, 'MEN', '1245', 0, 1, '', 'SHORT', 'LONG', 'featuredImage-1699103827216-900882134.jpg', '[\"thumbnailImages-1699103827216-697898191.jpg\"]', 'published', '2023-11-04 13:17:07', '2024-01-08 17:20:09', 'b8QGL5BQPT'),
(20, 'PRODUCT 4', 25.00, 'MEN', '1345', 0, 1, '', 'SHORT', 'LONG', 'featuredImage-1699103869227-3045479.jpg', '[\"thumbnailImages-1699103869227-804055869.jpg\"]', 'published', '2023-11-04 13:17:49', '2024-01-08 17:20:09', 'PWdyW9FQUr'),
(22, 'PRODUCT 5', 30.00, 'MEN', '1244', 0, 0, '', 'SHORT', 'LONG', 'featuredImage-1699104776196-858644875.jpg', '[\"thumbnailImages-1699104776196-653968118.jpg\"]', 'published', '2023-11-04 13:32:56', '2024-01-08 17:20:09', 'ilQdz6GdE6'),
(23, 'PRODUCT 6', 35.00, 'WOMEN', '2345', 0, 1, '', 'SHORT', 'LONG', 'featuredImage-1699104827156-605338085.jpg', '[\"thumbnailImages-1699104827156-421344678.jpg\"]', 'published', '2023-11-04 13:33:47', '2024-01-08 17:20:09', 'L7k8m3Q99O'),
(24, 'PRODUCT 7', 35.00, 'WOMEN', '2234', 0, 1, '', 'SHORT', 'LONG', 'featuredImage-1699106830389-310257762.jpg', '[\"thumbnailImages-1699106830389-895915599.jpg\"]', 'published', '2023-11-04 14:07:10', '2024-01-08 17:20:09', 'o8XYROWUd9'),
(43, 'p6', 4654.00, 'MEN', 'tert5464', 0, 0, '', 'fgdrgdfg', 'fdgfdgfd', NULL, NULL, 'published', '2024-01-21 15:22:10', '2024-01-21 15:22:10', ''),
(44, 'p6', 4654.00, 'MEN', 'tert5464', 0, 0, '', 'fgdrgdfg', 'fdgfdgfd', NULL, NULL, 'published', '2024-01-21 15:22:28', '2024-01-21 15:22:28', ''),
(45, 'p6', 4654.00, 'MEN', 'tert5464', 0, 0, '', 'fgdrgdfg', 'fdgfdgfd', NULL, NULL, 'published', '2024-01-21 15:26:03', '2024-01-21 15:26:03', ''),
(46, 'p6', 4654.00, 'MEN', 'tert5464', 0, 0, '', 'fgdrgdfg', 'fdgfdgfd', NULL, NULL, 'published', '2024-01-21 15:26:21', '2024-01-21 15:26:21', '');

-- --------------------------------------------------------

--
-- Table structure for table `shipping_methods`
--

CREATE TABLE `shipping_methods` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `shipping_methods`
--

INSERT INTO `shipping_methods` (`id`, `name`, `description`, `price`) VALUES
(1, 'Standard Shipping', '3-5 business days, after processing', 0.00),
(2, 'Express Shipping', '2-3 business days, after processing', 20.00),
(3, 'Rush Shipping', '1-2 business days, after processing', 30.00);

-- --------------------------------------------------------

--
-- Table structure for table `subscribed_users`
--

CREATE TABLE `subscribed_users` (
  `user_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subscribed_date` datetime NOT NULL,
  `subscribed_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `date_registered` date NOT NULL DEFAULT current_timestamp(),
  `updation_date` date NOT NULL DEFAULT current_timestamp(),
  `qrcode` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fname`, `lname`, `email`, `password`, `date_registered`, `updation_date`, `qrcode`) VALUES
(1, 'smats', 'smat', 'smats877@gmail.com', '$2b$10$3AIVBm5jw4/.9l2yTnT9ee0beZzDGPHC9ZdtIQt5/cf56iBA/e9Qm', '0000-00-00', '2024-01-13', '                                     \n                                     \n    █▀▀▀▀▀█    ▄  ▀▄▄█▀▀▀ █▀▀▀▀▀█    \n    █ ███ █ █▄██▀ ▀ ▀▄ ▀▄ █ ███ █    \n    █ ▀▀▀ █ █▀▄▄██▄▄   ▀█ █ ▀▀▀ █    \n    ▀▀▀▀▀▀▀ █▄█▄▀▄▀ █ ▀▄█ ▀▀▀▀▀▀▀    \n    █▄██▀█▀ ▄█▄▄▀ ▀▀▄▀ ▄▄▄█'),
(23, 'omer', 'khan', 'omerfarooqkhan7210@gmail.com', '$2b$10$iRJo6iR7OKtik2q1D0OQgOwpxwDUZdY/FP6IWvAMnYd4qicokEoGS', '0000-00-00', '2024-01-13', '                                     \n                                     \n    █▀▀▀▀▀█  ▀█▄▄▄▀▄▄█▀▀▀ █▀▀▀▀▀█    \n    █ ███ █ █ ▄█▄▄  ▀▄ ▀▄ █ ███ █    \n    █ ▀▀▀ █ ██▄▀▄▄▀▄   ▀█ █ ▀▀▀ █    \n    ▀▀▀▀▀▀▀ █ ▀▄▀ █ █ ▀▄█ ▀▀▀▀▀▀▀    \n    █▄▀██▀▀▄ █▄██▄ ▀▄▀ ▄▄▄█'),
(25, 'omer', 'khan', 'omerfarooq77210@gmail.com', '$2b$10$ygHQ5m8Rsjofp4a3COPKjuKoiNUHpgHRn9NRsqZlzvtnBnc/bzscO', '0000-00-00', '2024-01-13', '                                     \n                                     \n    █▀▀▀▀▀█ ▄▀ ▀▄█  █▄▀   █▀▀▀▀▀█    \n    █ ███ █ █▀█ ▀▄▄▄█▄ ▀  █ ███ █    \n    █ ▀▀▀ █  ▄▀▀  █    ▀█ █ ▀▀▀ █    \n    ▀▀▀▀▀▀▀ █▄█▄█ █▄█ ▀▄█ ▀▀▀▀▀▀▀    \n    ▀▄▄▄▄▄▀▄██▄▄ ▄▄█ ▀ ▄ ▀▀'),
(26, 'smats', 'smat', 'smatswork@gmail.com', '$2b$10$kliCldv2IRhqhL3B5p6LPO/57NxdqmW5Qt4fWiYpesg0VbbqE5QJ2', '0000-00-00', '2024-01-13', '                                     \n                                     \n    █▀▀▀▀▀█ █▄▀▄█▄█ ▄▀█▀█ █▀▀▀▀▀█    \n    █ ███ █ ▄▄▀▀▀█ ▀ ▄▀ ▄ █ ███ █    \n    █ ▀▀▀ █    ▀▄ ▄▀▄▀██▄ █ ▀▀▀ █    \n    ▀▀▀▀▀▀▀ █▄▀▄█ █▄█▄█▄▀ ▀▀▀▀▀▀▀    \n    █▄██ █▀▀ ▀ █▀█  █▀▀█▄▄█'),
(27, 'STANZ', 'Tiles', 'abbasmansoor95@gmail.com', '$2b$10$Fnpak5GVLm6eJHYJLu4mdOfkthVZ6JlLSeOKiumE56f5dLGj0DnlO', '0000-00-00', '2024-01-13', '                                     \n                                     \n    █▀▀▀▀▀█  ▄█▄ ▄▀▄▄█▀▀▀ █▀▀▀▀▀█    \n    █ ███ █ █ ▄ ▄▄  ▀▄ ▀▄ █ ███ █    \n    █ ▀▀▀ █ ██▀▄▀▄█▄   ▀█ █ ▀▀▀ █    \n    ▀▀▀▀▀▀▀ █ █▄▀ █ █ ▀▄█ ▀▀▀▀▀▀▀    \n    ▀▄▀██▀▀ ▄▀▀ ▀▄ ▀▄▀ ▄▄▄█'),
(28, 'Rizwan', 'Sheikh', 'researchmate8@gmail.com', '$2b$10$ps0g5esH0WAfBxOOQFYDguuobC6wdB4LWTwDrdzQW2SqcWwcNkclq', '0000-00-00', '2024-01-13', '                                     \n                                     \n    █▀▀▀▀▀█  ▄  ▄▄▀▄▄█▀▀▀ █▀▀▀▀▀█    \n    █ ███ █ ██ █ ▄  ▀▄ ▀▄ █ ███ █    \n    █ ▀▀▀ █ ██  █▀▀▄   ▀█ █ ▀▀▀ █    \n    ▀▀▀▀▀▀▀ █▄█▄█ ▀ █ ▀▄█ ▀▀▀▀▀▀▀    \n    ▀ ██▀█▀  ██▄▀▄ ▀▄▀ ▄▄▄█');

-- --------------------------------------------------------

--
-- Table structure for table `user_currency_preferences`
--

CREATE TABLE `user_currency_preferences` (
  `id` int(11) NOT NULL,
  `user_uuid` varchar(255) NOT NULL,
  `currency_code` varchar(3) NOT NULL,
  `country` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user_currency_preferences`
--

INSERT INTO `user_currency_preferences` (`id`, `user_uuid`, `currency_code`, `country`, `is_active`) VALUES
(1, '80201791-e4d1-42e4-b5d1-dded6c001503', 'USD', 'Pakistan', 1),
(2, '19c68a59-ce63-43ef-9b11-f376523ae7ad', 'PKR', 'Pakistan', 1),
(3, 'a127964c-38da-4ce5-b0f8-463fbab92f0b', 'SGD', 'Pakistan', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_members`
--

CREATE TABLE `user_members` (
  `user_member_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `membership_id` int(11) DEFAULT NULL,
  `subscription_date` date NOT NULL,
  `expiration_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `user_members`
--

INSERT INTO `user_members` (`user_member_id`, `user_id`, `membership_id`, `subscription_date`, `expiration_date`) VALUES
(2, 1, 1, '2024-01-09', '2025-01-09'),
(4, 23, 3, '2024-01-10', '2025-01-10');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist_items`
--

CREATE TABLE `wishlist_items` (
  `id` int(11) NOT NULL,
  `user_id` varchar(500) NOT NULL,
  `prod_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `wishlist_items`
--

INSERT INTO `wishlist_items` (`id`, `user_id`, `prod_id`) VALUES
(1, 'a127964c-38da-4ce5-b0f8-463fbab92f0b', 23),
(2, '19c68a59-ce63-43ef-9b11-f376523ae7ad', 19),
(3, '80201791-e4d1-42e4-b5d1-dded6c001503', 17),
(4, '80201791-e4d1-42e4-b5d1-dded6c001503', 17),
(5, '38f9a877-9309-4bb0-ab4b-b385397fae4e', 18),
(8, '7ecaf77d-fe9b-410d-836a-5738b60eff5e', 23);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `attributes`
--
ALTER TABLE `attributes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`_id`);

--
-- Indexes for table `completed_orders`
--
ALTER TABLE `completed_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `prod_id` (`prod_id`);

--
-- Indexes for table `contact_mails`
--
ALTER TABLE `contact_mails`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `exchange_rates`
--
ALTER TABLE `exchange_rates`
  ADD PRIMARY KEY (`currency_code`);

--
-- Indexes for table `memberships`
--
ALTER TABLE `memberships`
  ADD PRIMARY KEY (`membership_id`);

--
-- Indexes for table `notified_users`
--
ALTER TABLE `notified_users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shipping_methods`
--
ALTER TABLE `shipping_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subscribed_users`
--
ALTER TABLE `subscribed_users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `id_2` (`id`);

--
-- Indexes for table `user_currency_preferences`
--
ALTER TABLE `user_currency_preferences`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_members`
--
ALTER TABLE `user_members`
  ADD PRIMARY KEY (`user_member_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `membership_id` (`membership_id`);

--
-- Indexes for table `wishlist_items`
--
ALTER TABLE `wishlist_items`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `attributes`
--
ALTER TABLE `attributes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `completed_orders`
--
ALTER TABLE `completed_orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `contact_mails`
--
ALTER TABLE `contact_mails`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `memberships`
--
ALTER TABLE `memberships`
  MODIFY `membership_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `notified_users`
--
ALTER TABLE `notified_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `subscribed_users`
--
ALTER TABLE `subscribed_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `user_currency_preferences`
--
ALTER TABLE `user_currency_preferences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_members`
--
ALTER TABLE `user_members`
  MODIFY `user_member_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `wishlist_items`
--
ALTER TABLE `wishlist_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `attributes`
--
ALTER TABLE `attributes`
  ADD CONSTRAINT `attributes_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_members`
--
ALTER TABLE `user_members`
  ADD CONSTRAINT `user_members_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_members_ibfk_2` FOREIGN KEY (`membership_id`) REFERENCES `memberships` (`membership_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
