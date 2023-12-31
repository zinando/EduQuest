"""empty message

Revision ID: 480b86f9eada
Revises: af40104524a0
Create Date: 2023-10-14 06:18:46.701602

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '480b86f9eada'
down_revision = 'af40104524a0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('class_result', schema=None) as batch_op:
        batch_op.add_column(sa.Column('review_comment', sa.String(length=625), nullable=True))
        batch_op.add_column(sa.Column('last_review_date', sa.DateTime(), nullable=True))

    with op.batch_alter_table('questions', schema=None) as batch_op:
        batch_op.add_column(sa.Column('review_comment', sa.String(length=625), nullable=True))
        batch_op.add_column(sa.Column('last_review_date', sa.DateTime(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('questions', schema=None) as batch_op:
        batch_op.drop_column('last_review_date')
        batch_op.drop_column('review_comment')

    with op.batch_alter_table('class_result', schema=None) as batch_op:
        batch_op.drop_column('last_review_date')
        batch_op.drop_column('review_comment')

    # ### end Alembic commands ###
