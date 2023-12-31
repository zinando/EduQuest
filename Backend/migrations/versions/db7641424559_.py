"""empty message

Revision ID: db7641424559
Revises: 480b86f9eada
Create Date: 2023-10-20 10:09:01.472150

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'db7641424559'
down_revision = '480b86f9eada'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('class_result', schema=None) as batch_op:
        batch_op.add_column(sa.Column('examina_id', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('cohort_id', sa.Integer(), nullable=True))
        batch_op.drop_column('cohort')
        batch_op.drop_column('session_code')

    with op.batch_alter_table('result', schema=None) as batch_op:
        batch_op.add_column(sa.Column('exam_script', sa.String(length=625), nullable=True))
        batch_op.add_column(sa.Column('approval_comment', sa.String(length=225), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('result', schema=None) as batch_op:
        batch_op.drop_column('approval_comment')
        batch_op.drop_column('exam_script')

    with op.batch_alter_table('class_result', schema=None) as batch_op:
        batch_op.add_column(sa.Column('session_code', sa.VARCHAR(length=25), nullable=False))
        batch_op.add_column(sa.Column('cohort', sa.INTEGER(), nullable=True))
        batch_op.drop_column('cohort_id')
        batch_op.drop_column('examina_id')

    # ### end Alembic commands ###
