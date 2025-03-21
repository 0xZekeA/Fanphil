import { useAuthProvider } from "@/providers/auth";
import { COLORS } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import getCardData from "../constants/salesInfo";
import { useSalesDataProvider } from "../providers/SalesDataProvider";
import styles from "../styles/styles";
import BackToSalesBtn from "./BackToSalesBtn";

const { width } = Dimensions.get("window");
const cardWidth = width * 0.8;

const SalesInfo = () => {
  const { salesInfo } = useSalesDataProvider();
  const { isAdmin } = useAuthProvider();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const formatCurrency = (value: number) => {
    return `₦${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
  };
  const cardData = getCardData(salesInfo, isAdmin);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / cardWidth);
    setCurrentIndex(index);
  };

  const renderPaginationDots = () => {
    return (
      <View style={styles.paginationContainer}>
        {cardData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor:
                  currentIndex === index ? COLORS.sky600 : COLORS.sky300,
                width: currentIndex === index ? 16 : 8,
                opacity: currentIndex === index ? 1 : 0.6,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  const renderCard = ({ item }: { item: any }) => {
    return (
      <View style={[styles.cardContainer, { width: cardWidth }]}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Ionicons name={item.icon} size={22} color={COLORS.sky900} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label} className="font-Jakarta">
              {item.title}
            </Text>
            <Text
              style={[styles.value, item.isProfit && styles.profitValue]}
              className="font-Jakarta"
            >
              {formatCurrency(item.value)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.salesInfoContainer}>
      <LinearGradient
        colors={[COLORS.sky800, COLORS.sky700]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <Text style={styles.headerText} className="font-JakartaMedium">
          Today's Sales Overview
        </Text>
      </LinearGradient>

      <FlatList
        ref={flatListRef}
        data={cardData}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={cardWidth}
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContent}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScroll}
      />

      {renderPaginationDots()}
      <BackToSalesBtn />
    </View>
  );
};

export default SalesInfo;
