import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
import joblib


def preprocess(path='placement_data.csv'):
    df = pd.read_csv(path)
    df.columns = [col.strip().lower().replace(' ', '_') for col in df.columns]

    df['internship'] = df['internship'].astype(str).str.lower().map({'yes': 1, 'no': 0}).fillna(0)
    df['placement_status'] = (
        df['placement_status'].astype(str).str.lower().map({'selected': 1, 'not selected': 0}).fillna(0)
    )

    if 'skill_match_ratio' not in df.columns:
        df['skill_match_ratio'] = 0.5

    X = df[['aptitude_score', 'communication_skills', 'internship', 'skill_match_ratio']]
    y = df['placement_status']
    return X, y


def train():
    X, y = preprocess()
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    numeric_features = ['aptitude_score', 'communication_skills', 'internship', 'skill_match_ratio']
    preprocessor = ColumnTransformer(
        transformers=[('num', StandardScaler(), numeric_features)],
        remainder='drop'
    )

    model = Pipeline(
        steps=[
            ('preprocessor', preprocessor),
            ('classifier', LogisticRegression())
        ]
    )

    model.fit(X_train, y_train)
    score = model.score(X_test, y_test)
    print(f'Validation Accuracy: {score:.2f}')

    joblib.dump(model, 'model.pkl')
    print('Saved model to model.pkl')


if __name__ == '__main__':
    train()
