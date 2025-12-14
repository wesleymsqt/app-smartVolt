import { StyleSheet, Platform, StatusBar } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "space-between",
  },
  header: {
    marginBottom: 24,
    marginTop: 20,
  },
  logoPlaceholder: {
    width: 80,
    height: 40,
    backgroundColor: "#94a3b8",
    marginBottom: 16,
    borderRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
    lineHeight: 32,
  },
  divider: {
    height: 1,
    backgroundColor: "#0f172a",
    width: "100%",
    marginBottom: 32,
  },
  authContainer: {
    borderWidth: 1,
    borderColor: "#0f172a",
    padding: 24,
    borderRadius: 0,
    marginBottom: 32,
  },
  authTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
    color: "#0f172a",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
  },
  socialButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingVertical: 10,
    borderRadius: 4,
    gap: 8,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0f172a",
  },
  carouselSection: {
    marginBottom: 20,
  },
  carouselIndicators: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8,
    marginBottom: 16,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#0f172a",
    backgroundColor: "transparent",
  },
  activeDot: {
    backgroundColor: "#cbd5e1",
  },
  footerSection: {
    alignItems: "center",
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#0f172a",
    paddingTop: 24,
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f172a",
  },
  featureImagePlaceholder: {
    width: 180,
    height: 140,
    backgroundColor: "#94a3b8",
    borderRadius: 4,
  },
  footerDescription: {
    textAlign: "center",
    fontSize: 14,
    color: "#0f172a",
    lineHeight: 20,
    maxWidth: 250,
  },
});
