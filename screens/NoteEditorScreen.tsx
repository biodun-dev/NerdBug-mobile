import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addNote, updateNote, deleteNote } from "../redux/slices/notesSlice";
import { StorageService, Note } from "../services/storage";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
import { NOTES_CONTENT } from "../data/notes";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { Ionicons } from "@expo/vector-icons";
import CustomModal from "../components/CustomModal";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

type NoteEditorRouteProp = RouteProp<RootStackParamList, "NoteEditor">;

const NoteEditorScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<NoteEditorRouteProp>();
  const allNotes = useSelector((state: RootState) => state.notes.items);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const existingNote = route.params?.note;
  const [title, setTitle] = useState(existingNote?.title || "");
  const [content, setContent] = useState(existingNote?.content || "");

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) {
      navigation.goBack();
      return;
    }

    const now = new Date().toISOString();
    let updatedNotes: Note[] = [];

    if (existingNote) {
      const updatedNote: Note = {
        ...existingNote,
        title,
        content,
        updatedAt: now,
      };
      dispatch(updateNote(updatedNote));
      updatedNotes = allNotes.map((n) => (n.id === existingNote.id ? updatedNote : n));
    } else {
      const newNote: Note = {
        id: Math.random().toString(36).substring(7),
        title,
        content,
        createdAt: now,
        updatedAt: now,
      };
      dispatch(addNote(newNote));
      updatedNotes = [newNote, ...allNotes];
    }

    await StorageService.saveNotes(updatedNotes);
    navigation.goBack();
  };

  const handleDelete = async () => {
    if (!existingNote) return;
    dispatch(deleteNote(existingNote.id));
    const updatedNotes = allNotes.filter((n) => n.id !== existingNote.id);
    await StorageService.saveNotes(updatedNotes);
    setShowDeleteModal(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSave} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          {existingNote && (
            <TouchableOpacity onPress={() => setShowDeleteModal(true)} style={styles.headerButton}>
              <Ionicons name="trash-outline" size={24} color={colors.error} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>{NOTES_CONTENT.editor.saveButton}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TextInput
          style={styles.titleInput}
          placeholder={NOTES_CONTENT.editor.titlePlaceholder}
          placeholderTextColor={colors.placeholder}
          value={title}
          onChangeText={setTitle}
          multiline
        />
        <TextInput
          style={styles.contentInput}
          placeholder={NOTES_CONTENT.editor.contentPlaceholder}
          placeholderTextColor={colors.placeholder}
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />
      </ScrollView>

      <CustomModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title={NOTES_CONTENT.editor.deleteAlertTitle}
        message={NOTES_CONTENT.editor.deleteAlertMessage}
        confirmLabel={NOTES_CONTENT.editor.delete}
        cancelLabel={NOTES_CONTENT.editor.cancel}
        confirmColor={colors.error}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("1.5%"),
  },
  backButton: {
    padding: wp("2%"),
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("4%"),
  },
  headerButton: {
    padding: wp("2%"),
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("1%"),
    borderRadius: hp("5%"),
  },
  saveButtonText: {
    ...typography.buttonText,
    fontSize: hp("1.8%"),
  },
  scrollContent: {
    paddingHorizontal: wp("6%"),
    paddingBottom: hp("5%"),
  },
  titleInput: {
    ...typography.h2,
    fontSize: hp("3%"),
    marginBottom: hp("2%"),
    padding: 0,
  },
  contentInput: {
    ...typography.bodyLarge,
    fontSize: hp("2.2%"),
    color: colors.textSecondary,
    minHeight: hp("60%"),
    padding: 0,
  },
});

export default NoteEditorScreen;
