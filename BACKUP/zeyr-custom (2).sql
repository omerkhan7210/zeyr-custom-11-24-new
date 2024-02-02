-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 02, 2024 at 12:25 PM
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
(35, 28, 'researchmate8@gmail.com', 'Rizwan', 'Sheikh', 'Giants Solutions', 'Karachi , Pakistan', '', 'HOUSTON', 'Qatar', 'TEXAS', '+923212998045', 1, '2023-11-27 17:58:45'),
(36, 24, 'charliechaplin565@gmail.com', 'omer', 'khan', 'gtgtr', 'gever', 'refer', 'karachi', 'Pakistan', '75300', '+924356346346', 1, '2023-12-01 15:06:55'),
(39, 23, 'omerfarooqkhan7210@gmail.com', 'omer', 'khan', 'ii', 'gnero', 'ogvnrvjnr', 'karachi', 'Pakistan', '35700', '+923343779404', 1, '2024-01-27 09:13:59'),
(53, 32, 'charliechaplin565@gmail.com', 'omer', 'khan', 'gtgtr', 'gever', 'refer', 'karachi', 'Pakistan', '75300', '+924356346346', 1, '2024-01-31 15:55:49'),
(54, 23, 'omerfarooqkhan7210@gmail.com', 'omer', 'khan', 'The Royal Grill', 'Shop#G-6, sakina corner, Block 12 Gulistan-e-Johar, Karachi, Sindh', 'G-6 Sakina Corner ', 'karachi', 'Pakistan', '35700', '+923343779404', 1, '2024-01-31 18:10:41');

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `fname` varchar(30) NOT NULL,
  `lname` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(40) NOT NULL,
  `date_registered` date NOT NULL DEFAULT current_timestamp(),
  `thumbnail` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `fname`, `lname`, `email`, `password`, `role`, `date_registered`, `thumbnail`) VALUES
(1, 'omer', 'khan', 'omerfarooqkhan7210@gmail.com', '$2b$10$gtP783nbcBX3vpDDqWMVauR77FRGHY1rfHz/Gt.EqAMZv7LF57nd2', 'Admin', '2024-01-24', ''),
(2, 'omer', 'khan', 'charliechaplin565@gmail.com', '$2b$10$ED1RUPtmKrcMhA7MY8.AaeYwsAzE4tPstUCTtuW5vDhIrM.6.74mO', 'reader', '2024-01-26', '');

-- --------------------------------------------------------

--
-- Table structure for table `attributes`
--

CREATE TABLE `attributes` (
  `id` int(11) NOT NULL,
  `variationid` varchar(30) NOT NULL,
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

INSERT INTO `attributes` (`id`, `variationid`, `productId`, `attributeType`, `attributeValue`, `attributeprice`, `attributestock`, `attributeimg`) VALUES
(77, '0nsmx9e9cvk', 58, 'color', 'BLACK', 10, 20, 'variationImages-1706286752406-8088245.png'),
(78, '0nsmx9e9cvk', 58, 'size', 'XXL', 10, 20, 'variationImages-1706286752406-8088245.png'),
(79, 'gqy22ue6w5u', 58, 'color', 'RED', 30, 40, 'variationImages-1706286752406-8088245.png'),
(80, 'gqy22ue6w5u', 58, 'size', 'XL', 30, 40, 'variationImages-1706286752406-8088245.png'),
(85, 'z29qy1g2acl', 62, 'color', 'red', 10, 50, 'variationImages-1706289982098-701606812.jpg'),
(86, '5gxvv02fau3', 63, 'color', 'green', 10, 20, 'variationImages-1706290328217-765619937.jpg'),
(87, '0eu8nqrtboip', 64, 'color', 'PURPLE', 25, 50, 'variationImages-1706290379029-876906122.jpg'),
(88, '4hn63tidpk1', 65, 'color', 'BLUE', 40, 50, 'variationImages-1706290935551-355677800.jpg'),
(89, 'gffy7zsgcog', 66, 'color', 'brown', 55, 66, 'variationImages-1706352453132-447892751.jpg'),
(90, 'gffy7zsgcog', 66, 'size', 'xl', 55, 66, 'variationImages-1706352453132-447892751.jpg'),
(107, '0nsmx9e9cvk', 72, 'color', 'BLACK', 10, 20, 'variationImages-1706286752406-8088245.png'),
(108, '0nsmx9e9cvk', 72, 'size', 'XXL', 10, 20, 'variationImages-1706286752406-8088245.png'),
(109, 'gqy22ue6w5u', 72, 'color', 'RED', 30, 40, 'variationImages-1706286752406-8088245.png'),
(110, 'gqy22ue6w5u', 72, 'size', 'XL', 30, 40, 'variationImages-1706286752406-8088245.png'),
(113, 'zxktmkgews', 72, 'color', 'blue', 100, 0, ''),
(114, 'zxktmkgews', 72, 'size', 'L', 100, 0, ''),
(115, 'ai0jg8atqyv', 80, 'color', 'blue', 180, 24, 'variationImages-1706707676572-925731537.jpg'),
(116, 'ai0jg8atqyv', 80, 'size', 'xl', 180, 24, 'variationImages-1706707676572-925731537.jpg');

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

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `parentId` int(11) DEFAULT NULL,
  `thumbnail` text NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`_id`, `name`, `parentId`, `thumbnail`, `createdAt`, `updatedAt`) VALUES
(2, 'TEES', 1, '', '2023-10-27 15:12:56', '2023-10-27 15:12:56'),
(5, 'TEES', 3, '', '2023-11-04 13:21:35', '2023-11-04 13:21:35'),
(16, 'Men', NULL, '', '2024-01-27 12:07:46', '2024-01-27 12:07:46'),
(17, 'Women', NULL, '', '2024-01-29 18:00:08', '2024-01-29 18:00:08'),
(18, 'TEE\'S', 16, '', '2024-01-29 18:00:22', '2024-01-29 18:00:22');

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
  `paymentmethod` varchar(40) NOT NULL,
  `order_status` enum('pending','completed','failed','refunded','on hold','processing','draft') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `completed_orders`
--

INSERT INTO `completed_orders` (`id`, `formatted_order_id`, `order_id`, `prod_id`, `selectedVariations`, `prod_quantity`, `paymentmethod`, `order_status`) VALUES
(57, '#0517', 517, 58, '{\"color\":\"BLUE\",\"size\":\"XL\"}', 1, 'COD', 'draft'),
(58, '#0517', 517, 63, '{\"color\":\"GREEN\",\"size\":\"L\"}', 1, 'COD', 'draft'),
(62, '#0360', 360, 58, '{\"color\":\"BLACK\",\"size\":\"XXL\"}', 3, 'COD', 'pending'),
(63, '#0999', 999, 2, '\"\"', 1, 'COD', 'pending'),
(76, '0170', 170, 80, '{\"color\":\"blue\",\"size\":\"xl\"}', 6, 'COD', 'pending'),
(78, '3118', 3118, 58, '{\"color\":\"RED\",\"size\":\"XL\"}', 1, 'COD', 'pending');

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
  `currency_code` varchar(5) NOT NULL DEFAULT 'USD',
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
(36, 360, 23, 30, 94, 75.00, 105.00, 'USD', 3, 'pending', '2024-01-27 09:26:12'),
(37, 999, 32, 42, 101, 100.00, 120.00, 'USD', 2, 'pending', '2024-01-29 15:11:37'),
(53, 170, 32, 53, 105, 1140.00, 1160.00, 'USD', 2, 'completed', '2024-01-31 16:35:39'),
(54, 3118, 23, 30, 106, 50.00, 50.00, 'USD', 1, 'completed', '2024-01-31 18:15:16');

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
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `categories`, `sku`, `isOnSale`, `isFeatured`, `videos`, `shortDescription`, `longDescription`, `featuredImage`, `productImages`, `status`, `createdAt`, `updatedAt`) VALUES
(58, 'Product 1', 50.00, 'Men', '2345', 0, 0, '', 'short', 'long', 'featuredImage-1706286752404-525040702.jpg', '[\"thumbnailImages-1706286752405-317929383.jpg\",\"thumbnailImages-1706286752405-311162543.jpg\"]', 'published', '2024-01-26 16:32:32', '2024-01-30 15:48:34'),
(62, 'Product 2', 30.00, 'Women', '1123', 0, 1, '', 'short', 'long', 'featuredImage-1706289982096-613699763.jpg', '[\"thumbnailImages-1706289982097-940551313.jpg\",\"thumbnailImages-1706289982097-781248053.jpg\"]', 'published', '2024-01-26 17:26:22', '2024-01-29 19:00:16'),
(63, 'Product 3', 35.00, 'Women', '1213', 0, 0, '', 'short', 'LONG', 'featuredImage-1706290328216-624674728.jpg', '[\"thumbnailImages-1706290328217-857926591.jpg\"]', 'published', '2024-01-26 17:32:08', '2024-01-29 19:00:16'),
(64, 'Product 4', 50.00, 'Women', '1235', 0, 0, '', 'SHORT', 'LONG', 'featuredImage-1706290379027-333080685.jpg', '[\"thumbnailImages-1706290379028-15522907.jpg\"]', 'draft', '2024-01-26 17:32:58', '2024-01-29 19:00:16'),
(65, 'Product 5', 40.00, 'Men', '1445', 0, 1, '', 'SHORT', 'LONG', 'featuredImage-1706290935549-61817637.jpg', '[\"thumbnailImages-1706290935550-965899479.jpg\"]', 'published', '2024-01-26 17:42:15', '2024-01-29 19:00:06'),
(66, 'Product 6', 50.00, 'Men', '1234', 1, 1, '', 'Short', 'Long', 'featuredImage-1706352453131-27036625.jpg', '[\"thumbnailImages-1706352453132-271727139.jpg\",\"thumbnailImages-1706352453132-503778430.jpg\"]', 'published', '2024-01-27 10:47:33', '2024-01-29 19:00:06'),
(72, 'Product 7', 100.00, 'Men', '2345', 0, 1, '', 'short', 'long', 'featuredImage-1706286752404-525040702.jpg', '[\"thumbnailImages-1706286752405-317929383.jpg\",\"thumbnailImages-1706286752405-311162543.jpg\"]', 'published', '2024-01-26 16:32:32', '2024-01-30 17:49:39'),
(80, 'p8', 190.00, 'Men', '2321', 0, 1, '', 'short', 'long', 'featuredImage-1706707676571-553080708.jpg', '[\"thumbnailImages-1706707676572-594288182.jpg\"]', 'published', '2024-01-31 13:27:56', '2024-01-31 13:27:56');

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
  `role` varchar(30) NOT NULL,
  `date_registered` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updation_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fname`, `lname`, `email`, `password`, `role`, `date_registered`, `updation_date`) VALUES
(1, 'smats', 'smat', 'smats877@gmail.com', '$2b$10$3AIVBm5jw4/.9l2yTnT9ee0beZzDGPHC9ZdtIQt5/cf56iBA/e9Qm', '', '2024-01-25 16:33:09', '2024-01-25 16:33:38'),
(23, 'omer', 'khan', 'omerfarooqkhan7210@gmail.com', '$2b$10$E3Mawju1a/KPPrDh8MjEzOzMRZrUXTQO.2k0LAIaNcoVDrPhikJcS', '', '2024-01-30 14:08:28', '2024-01-25 16:33:38'),
(25, 'omer', 'khan', 'omerfarooq77210@gmail.com', '$2b$10$ygHQ5m8Rsjofp4a3COPKjuKoiNUHpgHRn9NRsqZlzvtnBnc/bzscO', '', '2024-01-25 16:33:09', '2024-01-25 16:33:38'),
(26, 'smats', 'smat', 'smatswork@gmail.com', '$2b$10$kliCldv2IRhqhL3B5p6LPO/57NxdqmW5Qt4fWiYpesg0VbbqE5QJ2', '', '2024-01-25 16:33:09', '2024-01-25 16:33:38'),
(27, 'STANZ', 'Tiles', 'abbasmansoor95@gmail.com', '$2b$10$Fnpak5GVLm6eJHYJLu4mdOfkthVZ6JlLSeOKiumE56f5dLGj0DnlO', '', '2024-01-25 16:33:09', '2024-01-25 16:33:38'),
(28, 'Rizwan', 'Sheikh', 'researchmate8@gmail.com', '$2b$10$ps0g5esH0WAfBxOOQFYDguuobC6wdB4LWTwDrdzQW2SqcWwcNkclq', '', '2024-01-25 16:33:09', '2024-01-25 16:33:38'),
(29, 'Wajahat', 'Hussain', 'mwajahathussain.mwh@gmail.com', '$2b$10$tpoHqT2RkH1vVqyWfm1.qebkhKAepPR0ncr86jH/tZTSQJry5ODpW', 'Customer', '2024-01-27 12:01:26', '2024-01-27 12:01:26'),
(32, 'omer', 'khan', 'charliechaplin565@gmail.com', '$2b$10$8wlN4Amj4j.8ntxIpyHC0ebtfNtilTgLb6O7EUUPXhtwJjv5.LeiO', '', '2024-01-31 14:42:01', '2024-01-29 15:11:21');

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
(9, '80201791-e4d1-42e4-b5d1-dded6c001503', 66),
(11, '95519a1b-6534-4c3b-ba7e-7569e4cd6ae8', 80),
(12, '95519a1b-6534-4c3b-ba7e-7569e4cd6ae8', 72);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `attributes`
--
ALTER TABLE `attributes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `completed_orders`
--
ALTER TABLE `completed_orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `subscribed_users`
--
ALTER TABLE `subscribed_users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
