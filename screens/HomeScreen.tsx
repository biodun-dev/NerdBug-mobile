import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setNotes } from "../redux/slices/notesSlice";
import { StorageService, Note } from "../services/storage";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import { NOTES_CONTENT } from "../data/notes";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const notes = useSelector((state: RootState) => state.notes.items);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const loadNotes = async () => {
      const storedNotes = await StorageService.getNotes();
      dispatch(setNotes(storedNotes));
    };
    loadNotes();
  }, [dispatch]);

  const renderNoteItem = ({ item }: { item: Note }) => (
    <TouchableOpacity
      style={styles.noteCard}
      onPress={() => navigation.navigate("NoteEditor", { note: item })}
    >
      <Text style={styles.noteTitle} numberOfLines={1}>
        {item.title || NOTES_CONTENT.editor.untitled}
      </Text>
      <Text style={styles.noteContent} numberOfLines={2}>
        {item.content}
      </Text>
      <Text style={styles.noteDate}>
        {new Date(item.updatedAt).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{NOTES_CONTENT.home.title}</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.placeholder} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={NOTES_CONTENT.home.searchPlaceholder}
          placeholderTextColor={colors.placeholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color={colors.placeholder} />
          </TouchableOpacity>
        )}
      </View>
      
      {filteredNotes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={80} color={colors.border} />
          <Text style={styles.emptyText}>
            {searchQuery ? NOTES_CONTENT.home.noResults : NOTES_CONTENT.home.emptyTitle}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredNotes}
          renderItem={renderNoteItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.fab}
        onPress={() => navigation.navigate("NoteEditor", {})}
      >
        <Ionicons name="add" size={30} color={colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: wp("6%"),
    paddingVertical: hp("2%"),
    backgroundColor: colors.background,
  },
  headerTitle: {
    ...typography.h1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.accent,
    marginHorizontal: wp("6%"),
    marginBottom: hp("2%"),
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("1.2%"),
    borderRadius: hp("1.5%"),
  },
  searchIcon: {
    marginRight: wp("2%"),
  },
  searchInput: {
    flex: 1,
    ...typography.bodyMedium,
    color: colors.textPrimary,
    padding: 0,
  },
  listContent: {
    paddingHorizontal: wp("6%"),
    paddingBottom: hp("10%"),
  },
  noteCard: {
    backgroundColor: colors.cardBg,
    borderRadius: hp("2%"),
    padding: wp("5%"),
    marginBottom: hp("2%"),
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: hp("0.5%") },
    shadowOpacity: 0.1,
    shadowRadius: hp("1%"),
    elevation: 2,
  },
  noteTitle: {
    ...typography.bodyLarge,
    fontWeight: "700",
    marginBottom: hp("0.5%"),
  },
  noteContent: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    marginBottom: hp("1%"),
  },
  noteDate: {
    ...typography.caption,
    color: colors.placeholder,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: hp("10%"),
  },
  emptyText: {
    ...typography.bodyLarge,
    color: colors.placeholder,
    marginTop: hp("2%"),
  },
  fabContainer: {
    position: "absolute",
    right: wp("6%"),
    bottom: hp("4%"),
  },
  fab: {
    width: hp("7%"),
    height: hp("7%"),
    borderRadius: hp("3.5%"),
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: hp("0.5%") },
    shadowOpacity: 0.3,
    shadowRadius: hp("1%"),
  },
});

export default HomeScreen;
