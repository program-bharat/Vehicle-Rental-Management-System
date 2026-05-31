import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllContacts, deleteContact, } from "../../api/contactAPI";

const ContactMessages = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedContactId, setSelectedContactId] = useState(null);
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await getAllContacts();
                setContacts(res.data.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchContacts();
    }, []);
    const handleDelete = async (id) => {
        try {
            await deleteContact(id);
            setContacts((prev) =>
                prev.filter(
                    (contact) => contact._id !== id
                )
            );
            toast.success("Message Deleted Successfully");
        } catch (error) {
            toast.error(error);

        }
    };
    if (loading) {
        return (
            <div className="text-center py-20 text-3xl font-bold">
                Loading Messages...
            </div>
        );
    }
    if (error) {
        return (
            <div className="text-center py-20 text-red-500 text-2xl font-bold">
                {error}
            </div>
        );
    }
    return (
        <>
            <h1 className="text-4xl font-bold mb-10">
                Contact Messages
            </h1>
            {
                contacts.length === 0 ? (
                    <div className="bg-white border border-[#D6EFE3] rounded-3xl p-10 text-center">
                        <h2 className="text-2xl font-semibold text-gray-600">
                            No Messages Found
                        </h2>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                        {
                            contacts.map((contact) => (
                                <div
                                    key={contact._id}
                                    className="bg-white border border-[#D6EFE3] rounded-3xl p-6 shadow-sm hover:shadow-lg transition flex flex-col h-full"
                                >
                                    <div className="flex items-start justify-between mb-5">
                                        <div>
                                            <h2 className="text-xl font-bold text-[#091413]">
                                                {contact.name}
                                            </h2>
                                            <p className="text-sm text-gray-500 break-all">
                                                {contact.email}
                                            </p>
                                            <span
                                                className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${contact.role === "owner"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-green-100 text-green-700"
                                                    }`}
                                            >
                                                {contact.role}
                                            </span>
                                        </div>
                                        <span className="bg-[#E7F5EF] text-[#285A48] px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                                            {contact.createdAt?.split("T")[0]}
                                        </span>
                                    </div>
                                    <div className="flex-1 space-y-5">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">
                                                Subject
                                            </p>
                                            <h3 className="font-semibold text-[#091413]">
                                                {contact.subject}
                                            </h3>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-2">
                                                Message
                                            </p>
                                            <div className="border border-[#D6EFE3] rounded-2xl p-4 bg-[#F8FCFA] max-h-40 overflow-y-auto">
                                                <p className="text-gray-700 text-sm leading-6 whitespace-pre-wrap break-words">
                                                    {contact.message}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSelectedContactId(contact._id);
                                            setShowDeleteConfirm(true);
                                        }}
                                        className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium cursor-pointer transition"
                                    >
                                        Delete Message
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                )
            }

            {
                showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
                        <div className="bg-white border border-[#dcefe7] rounded-[30px] w-full max-w-md shadow-xl p-7">
                            <h2 className="text-3xl font-bold text-[#091413] mb-3">
                                Delete Message
                            </h2>
                            <p className="text-gray-500 mb-8">
                                Are you sure you want to delete this contact message?
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => {
                                        setShowDeleteConfirm(false);
                                        setSelectedContactId(null);
                                    }}
                                    className="px-5 py-3 border border-[#dcefe7] rounded-2xl hover:bg-[#f6fbf8] transition-all duration-300 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        handleDelete(selectedContactId);
                                        setShowDeleteConfirm(false);
                                        setSelectedContactId(null);
                                    }}
                                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-2xl transition-all duration-300 cursor-pointer"
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default ContactMessages;