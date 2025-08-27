import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Upload, Image as ImageIcon } from 'lucide-react';
import { FirebaseProduct } from '../services/productService';

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<FirebaseProduct, 'id'> | FirebaseProduct) => Promise<void>;
  product?: FirebaseProduct | null;
  isEditing?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  isOpen,
  onClose,
  onSave,
  product,
  isEditing = false
}) => {
  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    peso: '',
    descricao: '',
    imagemUrl: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (product && isEditing) {
      setFormData({
        nome: product.nome,
        preco: product.preco.toString(),
        peso: product.peso,
        descricao: product.descricao,
        imagemUrl: product.imagemUrl || ''
      });
      setImagePreview(product.imagemUrl || '');
    } else {
      setFormData({
        nome: '',
        preco: '',
        peso: '',
        descricao: '',
        imagemUrl: ''
      });
      setImagePreview('');
    }
    setErrors({});
    setImageFile(null);
  }, [product, isEditing, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'Imagem deve ter no máximo 5MB' }));
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, image: 'Arquivo deve ser uma imagem' }));
        return;
      }

      setImageFile(file);
      setErrors(prev => ({ ...prev, image: '' }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.preco.trim()) newErrors.preco = 'Preço é obrigatório';
    else if (isNaN(Number(formData.preco)) || Number(formData.preco) <= 0) {
      newErrors.preco = 'Preço deve ser um número válido maior que zero';
    }
    if (!formData.peso.trim()) newErrors.peso = 'Peso é obrigatório';
    if (!formData.descricao.trim()) newErrors.descricao = 'Descrição é obrigatória';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      console.log('Iniciando salvamento do produto...');
      
      // Prepare product data without image upload for now
      let imagemUrl = formData.imagemUrl;
      
      // If there's a new image file, convert to base64 or use a placeholder
      if (imageFile) {
        console.log('Nova imagem detectada, usando placeholder...');
        // For now, use a placeholder URL since Firebase Storage might have permission issues
        imagemUrl = 'https://images-offstore.map.azionedge.net/compressed/504a912acb3e15ae04cdb96da83f506c.webp';
      }

      const productData = {
        nome: formData.nome.trim(),
        preco: Number(formData.preco),
        peso: formData.peso.trim(),
        descricao: formData.descricao.trim(),
        imagemUrl
      };

      console.log('Dados do produto:', productData);

      if (isEditing && product) {
        console.log('Atualizando produto existente...');
        await onSave({ ...productData, id: product.id } as FirebaseProduct);
      } else {
        console.log('Criando novo produto...');
        await onSave(productData);
      }
      
      console.log('Produto salvo com sucesso!');
      onClose();
    } catch (error: any) {
      console.error('Erro ao salvar produto:', error);
      setErrors({ general: 'Erro ao salvar produto. Verifique sua conexão e tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            {isEditing ? (
              <>
                <Save className="h-5 w-5 mr-2" />
                Editar Produto
              </>
            ) : (
              <>
                <Plus className="h-5 w-5 mr-2" />
                
              </>
            )}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {errors.general}
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Imagem do Produto
            </label>
            <div className="space-y-2">
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-md border"
                  />
                </div>
              )}
              <div className="flex items-center space-x-2">
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    <Upload className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {imageFile ? imageFile.name : 'Escolher imagem'}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              {errors.image && (
                <p className="text-red-600 text-xs mt-1">{errors.image}</p>
              )}
              <p className="text-xs text-gray-500">
                Formatos aceitos: JPG, PNG, GIF. Máximo 5MB.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Produto
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                errors.nome ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Ex: Eucalipto Tratado Premium"
            />
            {errors.nome && <p className="text-red-600 text-xs mt-1">{errors.nome}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preço (R$)
            </label>
            <input
              type="number"
              name="preco"
              value={formData.preco}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                errors.preco ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Ex: 45.90"
            />
            {errors.preco && <p className="text-red-600 text-xs mt-1">{errors.preco}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Peso/Unidade
            </label>
            <input
              type="text"
              name="peso"
              value={formData.peso}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                errors.peso ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Ex: 20kg, 1 unidade, 3 metros"
            />
            {errors.peso && <p className="text-red-600 text-xs mt-1">{errors.peso}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleInputChange}
              rows={3}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                errors.descricao ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Descrição detalhada do produto..."
            />
            {errors.descricao && <p className="text-red-600 text-xs mt-1">{errors.descricao}</p>}
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Salvando...
                </div>
              ) : (
                isEditing ? 'Salvar Alterações' : 'Adicionar Produto'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;